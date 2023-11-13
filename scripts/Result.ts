import { _decorator, Component, find, Node } from 'cc';
const { ccclass, property } = _decorator;

import { Score } from './Score';

@ccclass('Result')
export class Result extends Component {

    @property({type: Score})
    public score: Score;

    @property({type: Node})
    public spGameOver: Node;

    @property({type: Node})
    public buttonStartOver: Node;

    private gameController; 

    start() {
        this.gameController = find("GameController").getComponent("GameController");
        this.buttonStartOver.on(Node.EventType.TOUCH_END, this.gameController.reset, this.gameController);
    }

    reset() {
        this.score.reset();
    }

    show() {
        this.showScore();
        this.spGameOver.active = true;
        this.buttonStartOver.active = true;
    }

    hide() {
        this.score.hideScoreBoard();
        this.spGameOver.active = false;
        this.buttonStartOver.active = false;
    }

    showScore() {
        this.score.updateScoreBoard();
        this.score.showScoreBoard();
    }

    hideScore() {
        this.score.hideScoreBoard();
    }

}

