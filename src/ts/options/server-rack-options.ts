import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class ServerRackOptions extends PhysicalMaterialOptions {

    private _bladeCountHorizontal: number = 4;
    private _bladeCountVertical: number = 10;
    private _bladeLength: number = 0.9;
    private _bladeHeight: number = 0.2;
    private _housingLength: number = 0.05;
    private _rackLength: number = 0;
    private _gapLength: number = 1;
    private _roomLength: number = 0;
    private _rackHeight: number = 0;
    private _gapHeight: number = 0.5;
    private _roomHeight: number = 0;
    private _gapWidth: number = 2;
    private _bladeWidth: number = 2;
    private _housingWidth: number = 0.05;
    private _rackWidth: number = 0;
    private _roomWidth: number = 0;
    private _roomWidthHalf: number = 0;
    private _roomWidthHalfNegative: number = 0;

    public get roomWidthHalfNegative(): number {
        return this._roomWidthHalfNegative;
    }

    public get roomWidthHalf(): number {
        return this._roomWidthHalf;
    }

    public get roomWidth(): number {
        return this._roomWidth;
    }

    public get rackWidth(): number {
        return this._rackWidth;
    }

    public get housingWidth(): number {
        return this._housingWidth;
    }

    public set housingWidth(value: number) {
        this._housingWidth = value;
        this.updateCalculatedValues();
    }

    public get bladeWidth(): number {
        return this._bladeWidth;
    }

    public set bladeWidth(value: number) {
        this._bladeWidth = value;
        this.updateCalculatedValues();
    }

    public get gapWidth(): number {
        return this._gapWidth;
    }

    public set gapWidth(value: number) {
        this._gapWidth = value;
        this.updateCalculatedValues();
    }

    public get bladeCountHorizontal(): number {
        return this._bladeCountHorizontal;
    }

    public set bladeCountHorizontal(value: number) {
        this._bladeCountHorizontal = value;
        this.updateCalculatedValues();
    }

    public get bladeCountVertical(): number {
        return this._bladeCountVertical;
    }

    public set bladeCountVertical(value: number) {
        this._bladeCountVertical = value;
        this.updateCalculatedValues();
    }

    public get bladeLength(): number {
        return this._bladeLength;
    }

    public set bladeLength(value: number) {
        this._bladeLength = value;
        this.updateCalculatedValues();
    }

    public get bladeHeight(): number {
        return this._bladeHeight;
    }

    public set bladeHeight(value: number) {
        this._bladeHeight = value;
        this.updateCalculatedValues();
    }

    public get housingLength(): number {
        return this._housingLength;
    }

    public set housingLength(value: number) {
        this._housingLength = value;
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

    public get rackLength(): number {
        return this._rackLength;
    }

    public get rackHeight(): number {
        return this._rackHeight;
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

    public addToGui(gui: GUI, onChange: () => void): void {
        const folder = gui.addFolder('ServerRack').close();

        const gapFolder = folder.addFolder('Gaps').close();
        gapFolder.add(this, 'gapLength', 0.01, 2, 0.001).name('Length (m)').onFinishChange(onChange);
        gapFolder.add(this, 'gapHeight', 0.01, 2, 0.001).name('Height (m)').onFinishChange(onChange);
        gapFolder.add(this, 'gapWidth', 0.01, 10, 0.001).name('Width (m)').onFinishChange(onChange);

        const bladeFolder = folder.addFolder('Blades').close();
        bladeFolder.add(this, 'bladeCountHorizontal', 1, 10, 1).name('Horizontal Count').onFinishChange(onChange);
        bladeFolder.add(this, 'bladeCountVertical', 1, 40, 1).name('Vertical Count').onFinishChange(onChange);
        bladeFolder.add(this, 'bladeLength', 0.001, 2, 0.001).name('Length (m)').onFinishChange(onChange);
        bladeFolder.add(this, 'bladeHeight', 0.001, 1, 0.001).name('Height (m)').onFinishChange(onChange);
        bladeFolder.add(this, 'bladeWidth', 0.001, 5, 0.001).name('Width (m)').onFinishChange(onChange);

        const housingFolder = folder.addFolder('Housing').close();
        housingFolder.add(this, 'housingLength', 0.001, 0.5, 0.001).name('Length (m)').onFinishChange(onChange);
        housingFolder.add(this, 'housingWidth', 0.001, 0.5, 0.001).name('Width (m)').onFinishChange(onChange);

        super.addToGui(folder, onChange);
    }

    private updateCalculatedValues(): void {
        this._rackLength = (this._bladeLength + this._housingLength * 2) * this._bladeCountHorizontal;
        this._roomLength = this._rackLength + this._gapLength;

        this._rackHeight = this._bladeHeight * this._bladeCountVertical;
        this._roomHeight = this._rackHeight + this._gapHeight;

        this._rackWidth = this._bladeWidth + this._housingWidth;
        this._roomWidth = this._rackWidth * 2 + this._gapWidth;
        this._roomWidthHalf = this._roomWidth * 0.5;
        this._roomWidthHalfNegative = -this._roomWidthHalf;
    }
}