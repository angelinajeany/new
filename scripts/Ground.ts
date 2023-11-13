import { _decorator, Canvas, Color, Component, director, find, Node, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {

    @property({type: Node})
    private ground: Node[] = [];

    private gameController;

    start() {
        this.gameController = find("GameController").getComponent("GameController");
    }

    update(deltaTime: number) {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const canvasWidth = canvas.getComponent(UITransform).width;

        let gameSpeed = this.gameController.speed;

        let position = this.node.getPosition();
        position.x -= gameSpeed * deltaTime;
        if(position.x <= -canvasWidth){
            position.x += canvasWidth;
        }
        this.node.setPosition(position);
    }
}


