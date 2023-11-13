import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {

    @property({type: Node})
    public scoreboard: Node;

    @property({type: Label})
    public labelCurrentScorePlay: Label;

    @property({type: Label})
    public labelCurrentScore: Label;

    @property({type: Label})
    public labelHighScore: Label;

    private currentScore: number;
    private highScore: number;
    private deltaTimeCounter: number;

    start() {
        this.currentScore = 0;
        this.highScore = 0;
        this.deltaTimeCounter = 0;

        this.labelCurrentScorePlay.string = this.currentScore.toString();
        this.labelHighScore.string = this.highScore.toString();
    }

    update(deltaTime: number) {
        this.deltaTimeCounter += deltaTime;
        if(this.deltaTimeCounter >= 0.5){
            this.currentScore++;
            this.deltaTimeCounter -= 0.5;
            this.labelCurrentScorePlay.string = this.currentScore.toString();
        }
    }

    reset() {
        this.currentScore = 0;
        this.labelCurrentScorePlay.string = this.currentScore.toString();
    }

    updateScoreBoard() {
        this.labelCurrentScore.string = this.currentScore.toString();
        if(this.currentScore > this.highScore){
            this.highScore = this.currentScore;
            this.labelHighScore.string = this.labelCurrentScore.string;
        }
    }

    showScoreBoard() {
        this.scoreboard.active = true;
        this.labelCurrentScore.node.active = true;
        this.labelHighScore.node.active = true;
        this.labelCurrentScorePlay.node.active = false;
    }

    hideScoreBoard() {
        this.scoreboard.active = false;
        this.labelCurrentScore.node.active = false;
        this.labelHighScore.node.active = false;
        this.labelCurrentScorePlay.node.active = true;
    }
}


