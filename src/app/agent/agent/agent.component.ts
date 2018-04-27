import { Component, OnInit, OnDestroy, HostListener, isDevMode } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { AgentApiService } from '../../api/agent-api.service';

import { Game, Agent, Action, Tribunal, Vote, Request, Device } from '../../model/model';
import { KillModalComponent } from '../kill-modal/kill-modal.component';
import { UnmaskModalComponent } from '../unmask-modal/unmask-modal.component';
import { CodeModalComponent } from '../code-modal/code-modal.component';
import { SuicideComponent } from '../suicide/suicide.component';
import { ChangeMissionComponent } from '../change-mission/change-mission.component';
import { SocketsService } from '../../shared/sockets.service';
import { GameService } from '../../shared/game.service';
import { ActionsService } from '../../shared/actions.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.sass']
})
export class AgentComponent implements OnInit, OnDestroy {
  public agent: Agent;
  public tribunal: Tribunal;
  private sub: any;
  private id: string;

  public status: string = "created";
  public waitResponse: boolean = false;
  public showConfirmKill: boolean = false;
  public showConfirmUnmask: boolean = false;
  public firstLoad: boolean = true;
  public treatingRequest: Request = null;

  public GameService = GameService;

  constructor(private agentApiService: AgentApiService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private socketsService: SocketsService,
    //public pushNotificationsService: PushNotificationsService,
    private swPush: SwPush,
    public snackBar: MatSnackBar) { }
  
    base64Encode(arrayBuffer) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
  }
  getAgent() {
    this.agentApiService.getById(this.id).subscribe(
      res => {
        this.agent = res;
        this.status = this.agent.game.status;
        if (this.firstLoad) {
          this.firstLoad = false;
          this.socketsService.connect(this.agent.gameId, this.id);
          this.socketsService.requests.subscribe(request => this.getAgent());

          //push notification
          this.swPush.requestSubscription({
            serverPublicKey: (isDevMode()?'BDktgBWNuSgBc0m6H1Z-x09jgQMXdyk0LoYKoVToLQwBB9Ctd4ealBf8eR8Rs18wnjFL2aWaZ24JgTd9keQjXb0':'BM8vwMGLMuivO_CSMp4JzoEf7WLlcudPMcsn6VFnBYiNb6tKch4rrGrXyk9wEPXUq5i5cfaJoj6GLBi4ebjgYN4')
          })
            .then(sub => {
              let device = new Device();
              device.name = this.id;
              device.pushEndpoint = sub.endpoint;
              device.pushP256DH = this.base64Encode(sub.getKey("p256dh"));
              device.pushAuth = this.base64Encode(sub.getKey("auth"));
              this.agentApiService.addDevice(this.id, device).subscribe(r=>{
                 console.log("device added");
              });
            })
            .catch(err => console.error("Could not subscribe to notifications", err));

        }
        if (this.agent.requests && this.agent.requests.length > 0) {
          this.manageNewRequest(this.agent.requests[0]);
        }
      },
      err => {
        console.log("err", err);
      });
  }
  manageNewRequest(request: Request) {
    //treat only one request at a time
    this.treatingRequest = request;
    switch (request.type) {
      case ActionsService.REQUEST_TYPE_ASK_KILL:
        this.showConfirmKill = true;
        break;
      case ActionsService.REQUEST_TYPE_ASK_UNMASK:
        this.showConfirmUnmask = true;
        break;
      case ActionsService.REQUEST_TYPE_TRIBUNAL_STATUS:
        this.treatingRequest = null;
        break;
      case ActionsService.REQUEST_TYPE_ACTION_ERROR:
        this.waitResponse = false;
        this.snackBar.open(request.data, null, { duration: 3000 });
        this.treatingRequest = null;
        break;
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getAgent();
    });
    this.socketsService.requests.subscribe(r => {
      if (r.type == ActionsService.REQUEST_TYPE_AGENT_UPDATE) {
        this.getAgent();
      }
    })
  }

  @HostListener('window:focus', ['$event'])
  onFocus(event: any): void { this.getAgent() }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showRole() {
    let dialogRef = this.dialog.open(CodeModalComponent, {
      data: { agent: this.agent }
    });
    dialogRef.afterClosed().subscribe(result => { });
  }

  kill() {
    let dialogRef = this.dialog.open(KillModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.treatingRequest = null;
        this.getAgent();
      }
    });
  }
  confirmKill(confirm: boolean) {
    if (confirm) {
      this.socketsService.confirmKill(this.agent, this.treatingRequest).subscribe(r => {
        this.showConfirmKill = false;
        this.getAgent();
      }, error => {
        this.showConfirmKill = false;
        this.snackBar.open(error, null, { duration: 3000 });
      });
    }
    else {
      this.socketsService.unconfirmKill(this.agent, this.treatingRequest).subscribe(r => {
        this.showConfirmKill = false;
      }, error => {
        this.showConfirmKill = false;
        this.snackBar.open(error, null, { duration: 3000 });
      });
    }

  }

  confirmUnmask(confirm: boolean) {
    if (confirm) {
      this.socketsService.confirmUnmask(this.agent, this.treatingRequest).subscribe(r => {
        this.showConfirmUnmask = false;
        this.getAgent();
      }, error => {
        this.showConfirmUnmask = false;
        this.snackBar.open(error, null, { duration: 3000 });
      });
    }
    else {
      this.socketsService.unconfirmUnmask(this.agent, this.treatingRequest).subscribe(r => {
        this.showConfirmUnmask = false;
        this.getAgent();
      }, error => {
        this.showConfirmUnmask = false;
        this.snackBar.open(error, null, { duration: 3000 });
      });
    }
  }

  unmask() {
    let dialogRef = this.dialog.open(UnmaskModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.treatingRequest = null;
      this.getAgent();
    });
  }

  changeMission() {
    let dialogRef = this.dialog.open(ChangeMissionComponent, {
      data: { agent: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAgent();
      }
    });
  }

  suicide() {
    let dialogRef = this.dialog.open(SuicideComponent, {
      data: { agent: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAgent();
      }
    });
  }

  voteFor(agent: Agent) {
    //todo
    this.tribunal = null;
  }
}
