import { GUI } from 'lil-gui';
import { Color, ColorRepresentation } from 'three';

export abstract class PhysicalMaterialOptions {

    public readonly color?: Color;

    public roughness: number = 1;
    public metalness: number = 0;
    public clearcoat: number = 0;
    public clearcoatRoughness: number = 0;
    public thickness: number = 0.02;
    public reflectivity: number = 0;
    public envMapIntensity: number = 0;

    constructor(color?: ColorRepresentation) {
        if (color) {
            this.color = new Color(color);
        }
    }

    public addToGui(gui: GUI, onChange: () => void, folderName?: string): void {
        const folder = gui.addFolder(folderName ?? 'Physical Material').close();
        if (this.color) {
            folder.addColor(this, 'color').name('Color').onFinishChange(onChange);
        }
        folder.add(this, 'envMapIntensity', 0, 5, 0.01).name('Environment Intensity').onFinishChange(onChange);
        folder.add(this, 'roughness', 0, 1, 0.01).name('Roughness').onFinishChange(onChange);
        folder.add(this, 'metalness', 0, 1, 0.01).name('Metalness').onFinishChange(onChange);
        folder.add(this, 'reflectivity', 0, 1, 0.01).name('Reflectivity').onFinishChange(onChange);
        folder.add(this, 'clearcoat', 0, 1, 0.01).name('Clearcoat').onFinishChange(onChange);
        folder.add(this, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Roughness').onFinishChange(onChange);
        folder.add(this, 'thickness', 0, 10, 0.01).name('Clearcoat Thickness').onFinishChange(onChange);
    }
}