import { CeilingOptions } from './ceiling-options';
import { ServerRackOptions } from './server-rack-options';
import { WallOptions } from './wall-options';
import { FloorOptions } from './floor-options';
import { CameraOptions } from './camera-options';
import { GUI } from 'lil-gui';
import { Color } from 'three';
import { SoundOptions } from './sound-options';

export class ServerRoomOptions {

    public readonly floor: FloorOptions = new FloorOptions();
    public readonly ceiling: CeilingOptions = new CeilingOptions();
    public readonly serverRack: ServerRackOptions = new ServerRackOptions();
    public readonly walls: WallOptions = new WallOptions();
    public readonly camera: CameraOptions = new CameraOptions();
    public readonly sound: SoundOptions = new SoundOptions();

    public instanceCount: number = 10;

    public get ambientLight(): Color {
        return this.ceiling.light.color!;
    }

    public get ambientLightIntensity(): number {
        return this.ceiling.light.intensity;
    }

    public addToGui(gui: GUI, onGraphicChange: () => void, onCameraChange: () => void, onSoundChange: () => void): void {
        const editFolder = gui.addFolder('Edit').close();
        this.serverRack.addToGui(editFolder, () => {
            onGraphicChange();
            onCameraChange();
        });
        this.floor.addToGui(editFolder, onGraphicChange);
        this.ceiling.addToGui(editFolder, onGraphicChange);
        this.walls.addToGui(editFolder, onGraphicChange);

        this.camera.addToGui(gui, onCameraChange);
        this.sound.addToGui(gui, onSoundChange);
    }
}