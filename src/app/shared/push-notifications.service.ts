import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Device } from '../model/model';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
//import * as serviceWorker from './sw.js';

@Injectable()
export class PushNotificationsService {

  private publicKey: string = 'BDktgBWNuSgBc0m6H1Z-x09jgQMXdyk0LoYKoVToLQwBB9Ctd4ealBf8eR8Rs18wnjFL2aWaZ24JgTd9keQjXb0';
  private isSubscribed = false;
  permission: any;
  device: Device;

  constructor() {
    this.device = new Device();
    let $this = this;
    Notification.requestPermission().then(function (status) {
        if (status === 'denied') {
            $this.errorHandler('[Notification.requestPermission] Browser denied permissions to notification api.');
        } else if (status === 'granted') {
            console.log('[Notification.requestPermission] Initializing service worker.');
            $this.initialiseServiceWorker($this);
        }
    });
  }

  initialiseServiceWorker($this) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/assets/sw.js').then((reg)=>{
          $this.handleSWRegistration(reg, $this);
        });
    } else {
      $this.errorHandler('[initialiseServiceWorker] Service workers are not supported in this browser.');
    }
  };
  
  handleSWRegistration(reg, $this) {
    if (reg.installing) {
        console.log('Service worker installing');
    } else if (reg.waiting) {
        console.log('Service worker installed');
    } else if (reg.active) {
        console.log('Service worker active');
    }
  
    $this.initialiseState(reg);
  }
  
  // Once the service worker is registered set the initial state
  initialiseState(reg) {
    // Are Notifications supported in the service worker?
    if (!(reg.showNotification)) {
        this.errorHandler('[initialiseState] Notifications aren\'t supported on service workers.');
        return;
    }
  
    // Check if push messaging is supported
    if (!('PushManager' in window)) {
        this.errorHandler('[initialiseState] Push messaging isn\'t supported.');
        return;
    }
  
    // We need the service worker registration to check for a subscription
    navigator.serviceWorker.ready.then(function (reg) {
        // Do we already have a push message subscription?
        reg.pushManager.getSubscription()
            .then(function (subscription) {
                this.isSubscribed = subscription;
                if (this.isSubscribed) {
                    console.log('User is already subscribed to push notifications');
                } else {
                    console.log('User is not yet subscribed to push notifications');
                }
            })
            .catch(function (err) {
                console.log('[req.pushManager.getSubscription] Unable to get subscription details.', err);
            });
    });
  }
  
  subscribe(callback: any) {
    navigator.serviceWorker.ready.then(reg => {
        var subscribeParams:any = { userVisibleOnly: true };
        //Setting the public key of our VAPID key pair.
        var applicationServerKey = this.urlB64ToUint8Array(this.publicKey);
        subscribeParams.applicationServerKey = applicationServerKey;
  
        reg.pushManager.subscribe(subscribeParams)
            .then(function (subscription) {
                this.isSubscribed = true;
                this.device.pushEndpoint=subscription.endpoint;
                this.device.pushP256DH = this.base64Encode(subscription.getKey('p256dh'));
                this.device.pushAuth = this.base64Encode(subscription.getKey('auth'));
                callback();
                console.log(subscription);
            })
            .catch(function (e) {
                this.errorHandler('[subscribe] Unable to subscribe to push', e);
            });
    }).catch(error=>{
      console.log(error);
    });
  }
  
  errorHandler(message, e=null) {
    if (typeof e == 'undefined') {
        e = null;
    }
  
    console.error(message, e);
  }
  
  urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
  
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
  
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  base64Encode(arrayBuffer) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
  }
  


  
}
