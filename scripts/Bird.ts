import { _decorator, CCFloat, CCInteger, Collider2D, Color, Component, Contact2DType, director, find, Node, Sprite } from 'cc';
import { SFXPlayer, SoundType } from './SFXPlayer';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    @property({type: CCInteger})
    private fallSpeedConstant: number = 200;

    @property({type: CCFloat})
    private rotationSpeedConstant: number = 0.2;

    private gameController;
    private fallSpeed: number = 0;

    start() {
        this.gameController = find("GameController").getComponent("GameController");
        this.node.getComponent(Collider2D).on(Contact2DType.BEGIN_CONTACT, this.onCollide, this);
    }

    update(deltaTime: number) {
        let position = this.node.getPosition();
        this.fallSpeed -= 1.5 * this.fallSpeedConstant * deltaTime;
        position.y += this.fallSpeed * deltaTime;
        if(position.y <= -200){
            position.y = -200;
        }
        this.node.setPosition(position);

        let angle = this.fallSpeed * this.rotationSpeedConstant;
        if(angle >= 30){
            angle = 30;
        }else if(angle <= -90){
            angle = -90;
        }
        this.node.setRotationFromEuler(0, 0, angle);
    }

    fly() {
        if(!director.isPaused()){
            SFXPlayer.Instance.playSFX(SoundType.fly);
            this.fallSpeed = this.fallSpeedConstant;
        }
    }

    onCollide(self: Collider2D, other: Collider2D){
        if(other.tag === 0){
            SFXPlayer.Instance.playSFX(SoundType.hit);
            SFXPlayer.Instance.playSFX(SoundType.die);
            this.gameController.gameOver();
        }
    }

    reset() {
        this.fallSpeed = 0;
        let position = this.node.getPosition();
        position.x = 0;
        position.y = 0;
        this.node.setPosition(position);
        this.node.setRotationFromEuler(0, 0, 0);
    }
}


