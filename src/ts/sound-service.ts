import {
    Audio,
    AudioListener,
    AudioLoader,
    Object3D,
    PerspectiveCamera,
    PositionalAudio
} from 'three';
import { IServiceProvider } from './service-provider';
import { ServerSoundEmitters } from './objects-3d/server-sound-emitters';

export class SoundService {

    private static readonly SERVER_AMPLIFICATION: number = 6;
    private static readonly AMBIENT_AMPLIFICATION: number = 0.5;

    private _ambientSound?: Audio;
    private _serverSound?: PositionalAudio;

    public loaded: boolean;

    constructor(
        private readonly _provider: IServiceProvider,
        private readonly _serverSoundEmitters: ServerSoundEmitters) {
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
        this._serverSoundEmitters.children.forEach((child: Object3D) => child.add(this._serverSound!));

        this.update();
    }

    public update(): void {
        if (this._ambientSound) {
            this._ambientSound.setVolume(this._provider.options.sound.master * this._provider.options.sound.ambient * SoundService.AMBIENT_AMPLIFICATION);
            if (!this._provider.options.sound.mute && !this._ambientSound.isPlaying) {
                this._ambientSound.play();
            } else if (this._provider.options.sound.mute && this._ambientSound.isPlaying) {
                this._ambientSound.stop();
            }
        }

        if (this._serverSound) {
            this._serverSound.setMaxDistance(this._provider.options.serverRack.housing.width);
            this._serverSound.setVolume(this._provider.options.sound.master * this._provider.options.sound.server * SoundService.SERVER_AMPLIFICATION);
            if (!this._provider.options.sound.mute && !this._serverSound.isPlaying) {
                this._serverSound.play();
            } else if (this._provider.options.sound.mute && this._serverSound.isPlaying) {
                this._serverSound.stop();
            }
        }
    }
}