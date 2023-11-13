import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum SoundType {
    fly = 0,
    die = 1,
    hit = 2,
    swoosh = 3,
    bgsound = 4
}

@ccclass('SFXComponent')
export class SFXPlayer extends Component {
    @property({type: AudioClip})
    public sfx: AudioClip[] = [];

    private source: AudioSource;
    static Instance: SFXPlayer = null;

    stopSFX() {
        if (this.getComponent(AudioSource)) {
            this.getComponent(AudioSource).stop();
        }
    }


    start() {
        SFXPlayer.Instance = this;
        this.source = this.getComponent(AudioSource);
    }

    playSFX(sound: SoundType) {
        this.source.playOneShot(this.sfx[sound]);
    }
}


