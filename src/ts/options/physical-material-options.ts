import { GUI } from 'lil-gui';
import { ColorRepresentation, MeshPhysicalMaterial } from 'three';
import { StandardMaterialOptionsBase } from './standard-material-options-base';

export class PhysicalMaterialOptions extends StandardMaterialOptionsBase<MeshPhysicalMaterial> {

    public clearcoat: number = 0;
    public clearcoatRoughness: number = 0;
    public thickness: number = 0.02;
    public reflectivity: number = 0;

    constructor(color?: ColorRepresentation) {
        super(color);
    }

    public override addToGui(gui: GUI, onChange: () => void, folderName?: string): GUI {
        const folder = super.addToGui(gui, onChange, folderName);
        folder.add(this, 'reflectivity', 0, 1, 0.01).name('Reflectivity').onFinishChange(onChange);
        folder.add(this, 'clearcoat', 0, 1, 0.01).name('Clearcoat').onFinishChange(onChange);
        folder.add(this, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Roughness').onFinishChange(onChange);
        folder.add(this, 'thickness', 0, 10, 0.01).name('Clearcoat Thickness').onFinishChange(onChange);
        return folder;
    }

    public override applyToMaterial(material: MeshPhysicalMaterial): void {
        material.clearcoat = this.clearcoat;
        material.clearcoatRoughness = this.clearcoatRoughness;
        material.reflectivity = this.reflectivity;
        material.thickness = this.thickness;
        super.applyToMaterial(material);
    }
}