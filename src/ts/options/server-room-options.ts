import { CeilingOptions } from './ceiling-options';
import { ServerRackOptions } from './server-rack-options';
import { WallOptions } from './wall-options';
import { FloorOptions } from './floor-options';
import { CameraOptions } from './camera-options';
import { GUI } from 'lil-gui';
import { Color } from 'three';

export class ServerRoomOptions {

    public readonly floor: FloorOptions = new FloorOptions();
    public readonly ceiling: CeilingOptions = new CeilingOptions();
    public readonly serverRack: ServerRackOptions = new ServerRackOptions();
    public readonly walls: WallOptions = new WallOptions();
    public readonly camera: CameraOptions = new CameraOptions();

    public instanceCount: number = 10;

    public get ambientLight(): Color {
        return this.ceiling.light.color!;
    }

    public get ambientLightIntensity(): number {
        return this.ceiling.light.intensity;
    }

    public addToGui(gui: GUI, onChange: () => void): void {
        const editFolder = gui.addFolder('Edit').close();
        this.serverRack.addToGui(editFolder, onChange);
        this.floor.addToGui(editFolder, onChange);
        this.ceiling.addToGui(editFolder, onChange);
        this.walls.addToGui(editFolder, onChange);
        
        this.camera.addToGui(gui, onChange);
    }
}