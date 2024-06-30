import { GUI } from 'lil-gui';
import { ColorRepresentation, MeshPhysicalMaterial } from 'three';
import { StandardMaterialOptionsBase } from './standard-material-options-base';

export abstract class PhysicalMaterialOptions extends StandardMaterialOptionsBase<MeshPhysicalMaterial> {

    public clearcoat: number = 0;
    public clearcoatRoughness: number = 0;
    public thickness: number = 0;
    public reflectivity: number = 0;
    public transmission: number = 0;

    constructor(color?: ColorRepresentation) {
        super(color);
    }

    public override applyToMaterial(material: MeshPhysicalMaterial): void {
        material.clearcoat = this.clearcoat;
        material.clearcoatRoughness = this.clearcoatRoughness;
        material.reflectivity = this.reflectivity;
        material.thickness = this.thickness;
        material.transmission = this.transmission;
        super.applyToMaterial(material);
    }

    protected override addOptions(gui: GUI, onChange: () => void): void {
        super.addOptions(gui, onChange);
        gui.add(this, 'reflectivity', 0, 1, 0.01).name('Reflectivity').onFinishChange(onChange);
        gui.add(this, 'clearcoat', 0, 1, 0.01).name('Clearcoat').onFinishChange(onChange);
        gui.add(this, 'clearcoatRoughness', 0, 1, 0.01).name('Clearcoat Roughness').onFinishChange(onChange);
        gui.add(this, 'transmission', 0, 1, 0.01).name('Transmission').onFinishChange(onChange);
        gui.add(this, 'thickness', 0, 10, 0.01).name('Thickness').onFinishChange(onChange);
    }
}