import { CeilingOptions } from './ceiling-options';
import { ServerRackOptions } from './server-rack-options';
import { WallOptions } from './wall-options';
import { FloorOptions } from './floor-options';
import { CameraOptions } from './camera-options';
import { GUI } from 'lil-gui';

export class ServerRoomOptions {

    public readonly floor: FloorOptions = new FloorOptions();
    public readonly ceiling: CeilingOptions = new CeilingOptions();
    public readonly serverRack: ServerRackOptions = new ServerRackOptions();
    public readonly walls: WallOptions = new WallOptions();
    public readonly camera: CameraOptions = new CameraOptions();

    public length: number = 5;
    public instanceCount: number = 20;

    private _width: number = 4;
    private _widthHalf: number = 2;
    private _widthHalfNegative: number = -2;

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;
        this._widthHalf = value * 0.5;
        this._widthHalfNegative = value * -0.5;
    }

    public get widthHalf(): number {
        return this._widthHalf;
    }

    public get widthHalfNegative(): number {
        return this._widthHalfNegative;
    }

    public addToGui(gui: GUI, onChange: () => void): void {
        const editFolder = gui.addFolder('Edit').close();

        const roomFolder = editFolder.addFolder('Room').close();
        roomFolder.add(this, 'length', 2, 10, 0.1).name('Length').onFinishChange(onChange);
        roomFolder.add(this, 'width', 2, 10, 0.1).name('Width').onFinishChange(onChange);

        this.serverRack.addToGui(editFolder, onChange);
        this.floor.addToGui(editFolder, onChange);
        this.ceiling.addToGui(editFolder, onChange);
        this.walls.addToGui(editFolder, onChange);

        this.camera.addToGui(gui, onChange);
    }
}