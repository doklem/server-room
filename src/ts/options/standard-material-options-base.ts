import { GUI } from 'lil-gui';
import { Color, ColorRepresentation, MeshStandardMaterial } from 'three';

export abstract class StandardMaterialOptionsBase<T extends MeshStandardMaterial> {

    protected abstract readonly _folderName: string;

    public readonly color?: Color;

    public roughness: number = 1;
    public metalness: number = 0;
    public envMapIntensity: number = 0;

    constructor(color?: ColorRepresentation) {
        if (color) {
            this.color = new Color(color);
        }
    }

    public addToGui(gui: GUI, onChange: () => void): GUI {
        const folder = gui.addFolder(this._folderName).close();
        this.addOptions(folder, onChange);
        return folder;
    }

    public applyToMaterial(material: T): void {
        material.roughness = this.roughness;
        material.metalness = this.metalness;
        material.envMapIntensity = this.envMapIntensity;
        if (this.color) {
            material.color.set(this.color);
        }
        material.needsUpdate = true;
    }

    protected addOptions(gui: GUI, onChange: () => void): void {
        if (this.color) {
            gui.addColor(this, 'color').name('Color').onFinishChange(onChange);
        }
        gui.add(this, 'envMapIntensity', 0, 5, 0.01).name('Environment Intensity').onFinishChange(onChange);
        gui.add(this, 'roughness', 0, 1, 0.01).name('Roughness').onFinishChange(onChange);
        gui.add(this, 'metalness', 0, 1, 0.01).name('Metalness').onFinishChange(onChange);
    }
}