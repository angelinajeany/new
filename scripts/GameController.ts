import { _decorator, CCFloat, CCInteger, Color, Component, director, game, Input, input, Label, Node, Sprite, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

import { Ground } from './Ground';
import { Bird } from './Bird';
import { Pipe } from './Pipe';
import { Result } from './Result';
import { SFXPlayer, SoundType } from './SFXPlayer';

@ccclass('GameController')
export class GameController extends Component {

    @property({type: Ground})
    public ground: Ground;

    @property({type: Bird})
    public bird: Bird;

    @property({type: Pipe})
    public pipe: Pipe;

    @property({type: Result})
    public result: Result;

    @property({type: CCFloat})
    public baseSpeed: number = 150;

    @property({type: Node})
    public startButton: Node;

    @property({type: Node})
    public pauseButton: Node;

    @property({type: Node})
    public playButton: Node;

    @property({type: Node})
    public background: Node;

    @property({type: CCFloat})
    public speedMultiplier: number = 1.05;

    @property({type: Node})
    public BG: Node;

    @property({type: Label})
    public pauseLabel: Label;

    @property({type: Node})
    public btnPlay1: Node;

    private deltaTimeCounter: number;
    public speed: number;

    start() {
        director.pause();
        SFXPlayer.Instance.playSFX(SoundType.bgsound);
        SFXPlayer.Instance.stopSFX();
        this.pipe.start();
        this.deltaTimeCounter = 0;
        this.speed = this.baseSpeed;
        this.node.on(Node.EventType.TOUCH_START, () => {
            this.bird.fly();
        })
        this.startButton.on(Node.EventType.TOUCH_END, this.startGame, this);
        this.pauseButton.on(Node.EventType.TOUCH_START, this.pauseGame, this);
        this.playButton.on(Node.EventType.TOUCH_START, this.playGame, this);
        this.reset();
    }

    update(deltaTime: number) {
        this.deltaTimeCounter += deltaTime;
        if(this.deltaTimeCounter >= 0.5){
            this.speed *= this.speedMultiplier;
            this.deltaTimeCounter -= 0.5;
        }
    }

    gameOver() {
        director.pause();
        SFXPlayer.Instance.stopSFX();
        this.result.show();
        this.pauseButton.active = false;
        this.playButton.active = false;
    }

    startGame(){
        this.startButton.active = false;
        this.pauseButton.active = true;
        this.playButton.active = false;
        this.pauseLabel.node.active = false;
        this.btnPlay1.active = false;
        director.resume();
    }

    reset() {
        this.pipe.reset();
        this.result.reset();
        this.result.hide();
        this.bird.reset();
        this.pauseButton.active = false;
        this.playButton.active = false;
        this.pauseLabel.node.active = false;
        this.btnPlay1.active = false;
        this.speed = this.baseSpeed;
        this.startButton.active = true;
    }

    pauseGame() {
        director.pause();
        SFXPlayer.Instance.stopSFX()
        this.pauseButton.active = false;
        this.pauseLabel.node.active = true;
        this.btnPlay1.active = true;
        this.playButton.active = true;
        this.BG.getComponent(UIOpacity).opacity = 150;
        this.result.showScore();
    }

    playGame() {
        SFXPlayer.Instance.stopSFX();
        this.playButton.active = false;
        this.pauseButton.active = true;
        this.pauseLabel.node.active = false;
        this.btnPlay1.active = false;
        this.BG.getComponent(UIOpacity).opacity = 0;
        this.result.hideScore();
        director.resume();
    }
}


