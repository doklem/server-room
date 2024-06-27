import { GUI } from 'lil-gui';
import { Color, ColorRepresentation, MeshStandardMaterial } from 'three';

export class StandardMaterialOptionsBase<T extends MeshStandardMaterial> {

    public readonly color?: Color;

    public roughness: number = 1;
    public metalness: number = 0;
    public envMapIntensity: number = 0;

    constructor(color?: ColorRepresentation) {
        if (color) {
            this.color = new Color(color);
        }
    }

    public addToGui(gui: GUI, onChange: () => void, folderName?: string): GUI {
        const folder = gui.addFolder(folderName ?? 'Material').close();
        if (this.color) {
            folder.addColor(this, 'color').name('Color').onFinishChange(onChange);
        }
        folder.add(this, 'envMapIntensity', 0, 5, 0.01).name('Environment Intensity').onFinishChange(onChange);
        folder.add(this, 'roughness', 0, 1, 0.01).name('Roughness').onFinishChange(onChange);
        folder.add(this, 'metalness', 0, 1, 0.01).name('Metalness').onFinishChange(onChange);
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
}