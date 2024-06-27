import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';
import { ServerHousingOptions } from './server-housing-options';
import { ServerBladeOptions } from './server-blade-options';

export class ServerRackOptions extends PhysicalMaterialOptions {

    private _gapLength: number = 1;
    private _roomLength: number = 0;
    private _gapHeight: number = 0.5;
    private _roomHeight: number = 0;
    private _gapWidth: number = 2;
    private _roomWidth: number = 0;
    private _roomWidthHalf: number = 0;
    private _bladeLength: number = 0;
    private _bladeHeight: number = 0;

    public readonly housing: ServerHousingOptions = new ServerHousingOptions();
    public readonly blade: ServerBladeOptions = new ServerBladeOptions();

    public get roomWidthHalf(): number {
        return this._roomWidthHalf;
    }

    public get roomWidth(): number {
        return this._roomWidth;
    }

    public get gapWidth(): number {
        return this._gapWidth;
    }

    public set gapWidth(value: number) {
        this._gapWidth = value;
        this.updateCalculatedValues();
    }

    public get gapLength(): number {
        return this._gapLength;
    }

    public set gapLength(value: number) {
        this._gapLength = value;
        this.updateCalculatedValues();
    }

    public get gapHeight(): number {
        return this._gapHeight;
    }

    public set gapHeight(value: number) {
        this._gapHeight = value;
        this.updateCalculatedValues();
    }

    public get bladeLength(): number {
        return this._bladeLength;
    }

    public get bladeHeight(): number {
        return this._bladeHeight;
    }

    public get roomLength(): number {
        return this._roomLength;
    }

    public get roomHeight(): number {
        return this._roomHeight;
    }

    constructor() {
        super('gray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 1;
        this.updateCalculatedValues();
    }

    public override addToGui(gui: GUI, onChange: () => void): GUI {
        const folder = gui.addFolder('ServerRack').close();

        const gapFolder = folder.addFolder('Gaps').close();
        gapFolder.add(this, 'gapLength', 0.01, 2, 0.001).name('Length (m)').onFinishChange(onChange);
        gapFolder.add(this, 'gapHeight', 0.01, 2, 0.001).name('Height (m)').onFinishChange(onChange);
        gapFolder.add(this, 'gapWidth', 0.01, 10, 0.001).name('Width (m)').onFinishChange(onChange);

        const onChangeWithInternals = () => {
            this.updateCalculatedValues();
            onChange();
        };

        this.blade.addToGui(folder, onChangeWithInternals);
        this.housing.addToGui(folder, onChangeWithInternals);

        super.addToGui(folder, onChange);
        return folder;
    }

    private updateCalculatedValues(): void {
        this._bladeLength = (this.housing.length - 2 * this.housing.thickness) / this.blade.countHorizontal;
        this._roomLength = this.housing.length + this._gapLength;

        this._bladeHeight = (this.housing.height - this.housing.thickness) / this.blade.countVertical;
        this._roomHeight = this.housing.height + this._gapHeight;

        this._roomWidth = this.housing.width * 2 + this._gapWidth;
        this._roomWidthHalf = this._roomWidth * 0.5;
    }
}