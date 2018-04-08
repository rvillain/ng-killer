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
    photo: string;
}

export class Mission { constructor(){}
    _id: string;
    title: string;
    difficulty: string;
    game: Game;
}

export class Action {constructor(){}
    _id: string;
    killer: Agent;
    target: Agent;
    type: string;
    Created_date: Date;
}

export class Tribunal { constructor(){}
    _id: string;
    killer: Agent;
    target: Agent;
    status: string;
    Created_date: Date;
    votes: Vote[];
}

export class Vote { constructor(){}
    _id: string;
    agent: Agent;
    choice: Agent;
    tribunal: Tribunal;
}

export class Rank {constructor(){}
    agent: Agent;
    score: number;
    place: number;
}