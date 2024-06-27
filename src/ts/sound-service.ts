import {
    Audio,
    AudioListener,
    AudioLoader,
    Object3D,
    PerspectiveCamera,
    PositionalAudio
} from 'three';
import { IServiceProvider } from './service-provider';

export class SoundService {

    private _ambientSound?: Audio;
    private _serverSound?: PositionalAudio;

    public loaded: boolean;

    constructor(
        private readonly _provider: IServiceProvider,
        private readonly _serverSoundSource: Object3D) {
        this.loaded = false;
    }

    public async loadAsync(camera: PerspectiveCamera): Promise<void> {
        if (this.loaded) {
            return;
        } else {
            this.loaded = true;
        }
        const audioListener = new AudioListener();
        camera.add(audioListener);

        const audioLoader = new AudioLoader();

        const ambientBuffer = await audioLoader.loadAsync('dist/assets/dark-server-76461.mp3');
        this._ambientSound = new Audio(audioListener);
        this._ambientSound.setBuffer(ambientBuffer);
        this._ambientSound.setLoop(true);

        const serverBuffer = await audioLoader.loadAsync('dist/assets/server-room-binaural-29072.mp3');
        this._serverSound = new PositionalAudio(audioListener);
        this._serverSound.setBuffer(serverBuffer);
        this._serverSound.setLoop(true);
        this._serverSound.setRefDistance(10);
        this._serverSoundSource.add(this._serverSound);

        this.update();
    }

    public update(): void {
        if (this._ambientSound) {
            this._ambientSound.setVolume(this._provider.options.sound.master * this._provider.options.sound.ambient);
            if (this._provider.options.sound.enabled && !this._ambientSound.isPlaying) {
                this._ambientSound.play();
            } else if (!this._provider.options.sound.enabled && this._ambientSound.isPlaying) {
                this._ambientSound.stop();
            }
        }

        if (this._serverSound) {
            this._serverSound.setVolume(this._provider.options.sound.master * this._provider.options.sound.server);
            if (this._provider.options.sound.enabled && !this._serverSound.isPlaying) {
                this._serverSound.play();
            } else if (!this._provider.options.sound.enabled && this._serverSound.isPlaying) {
                this._serverSound.stop();
            }
        }
    }
}