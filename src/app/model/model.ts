export class Game { constructor(){}
    id: number;
    name: string;
    agents: Agent[];
    missions: Mission[];
    actions: Action[];
    status: string;
}

export class Agent { 
constructor(){}
    id: string;
    name: string;
    mission: Mission;
    target: Agent;
    gameId: number;
    game: Game;
    life: Number;
    code: string;
    status: string;
    photo: string;
    requests: Request[];
}

export class Mission { constructor(){}
    id: number;
    gameId: number;
    title: string;
    difficulty: string;
    game: Game;
}

export class Action {constructor(){}
    id: string;
    killer: Agent;
    killerId: string;
    target: Agent;
    targetId: string;
    mission: Mission;
    missionTitle: string;
    missionId: number;
    type: string;
    dateCreation: Date;
}

export class Tribunal { constructor(){}
    id: string;
    killer: Agent;
    target: Agent;
    status: string;
    Created_date: Date;
    votes: Vote[];
}

export class Vote { constructor(){}
    id: string;
    agent: Agent;
    choice: Agent;
    tribunal: Tribunal;
}

export class Rank {constructor(){}
    agent: Agent;
    score: number;
    kills: number;
    unmasks: number;
    bluffs: number;
    place: number;
}

export class Request {constructor(){}
    id: number;
    parentRequestId: number;
    gameId: number;
    parentRequest: Request;
    emitter: Agent;
    receiver: Agent;
    emitterId: String;
    receiverId: String;
    type: string;
    data: string;
}