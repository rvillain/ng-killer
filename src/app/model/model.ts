export class Game { constructor(){}
    _id: string;
    name: string;
    agents: Agent[];
    missions: Mission[];
    actions: Action[];
    status: string;
    Created_date: Date;
}

export class Agent { constructor(){}
    _id: string;
    name: string;
    mission: Mission;
    target: Agent;
    game: Game;
    life: Number;
    code: string;
    status: string;
}

export class Mission { constructor(){}
    _id: string;
    title: string;
    game: Game;
}

export class Action {constructor(){}
    _id: string;
    killer: Agent;
    target: Agent;
    type: string;
    Created_date: Date;
}