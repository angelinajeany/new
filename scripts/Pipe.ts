import { _decorator, Canvas, Component, director, find, instantiate, Node, Prefab, Quat, randomRange, randomRangeInt, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipe')
export class Pipe extends Component {

    @property({type: Prefab})
    private prefabPipe: Prefab;
    
    private gameController;
    private pipes: Node[] = [];
    private pipeCount: number = 3;
    private pipeDistance: number = 200;

    start() {
        this.gameController = find("GameController").getComponent("GameController");
        for(let i = 0; i < this.pipeCount; i++){
            let newPipe = instantiate(this.prefabPipe);
            newPipe.setPosition(new Vec3(200 + (i+1) * this.pipeDistance, randomRangeInt(-100, 100), 0));
            this.pipes.push(newPipe);
            this.node.addChild(this.pipes[i]);
        }
    }

    update(deltaTime: number) {
        const scene = director.getScene();
        const canvas = scene.getComponentInChildren(Canvas);
        const canvasWidth = canvas.getComponent(UITransform).width;

        for(let i = 0; i < this.pipes.length; i++){
            let pipe = this.pipes[i].getPosition();
            pipe.x -= this.gameController.speed * deltaTime;
            if(pipe.x <= -200){
                pipe.x += (canvasWidth + this.pipeDistance);
                if(randomRange(0,1) <= 0.5){
                    pipe.y = randomRangeInt(-300, -200);
                    this.pipes[i].setRotationFromEuler(0, 0, 0);
                }else{
                    pipe.y = randomRangeInt(200, 300);
                    this.pipes[i].setRotationFromEuler(0, 0, 180);
                }
            }
            this.pipes[i].setPosition(pipe);
        }
    }

    reset() {
        for(let i = 0; i < this.pipeCount; i++){
            let pipe = this.pipes[i].getPosition();
            pipe.x = 200 + (i+1) * this.pipeDistance;
            if(randomRange(0,1) <= 0.5){
                pipe.y = randomRangeInt(-300, -200);
                this.pipes[i].setRotationFromEuler(0, 0, 0);
            }else{
                pipe.y = randomRangeInt(200, 300);
                this.pipes[i].setRotationFromEuler(0, 0, 180);
            }
            this.pipes[i].setPosition(pipe);
        }
    }
}


