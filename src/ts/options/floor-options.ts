import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class FloorOptions extends PhysicalMaterialOptions {

    constructor() {
        super('lightgray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 0;
        this.clearcoat = 1;
        this.clearcoatRoughness = 0;
        this.thickness = 0.5;
        this.reflectivity = 1;
    }

    public override addToGui(gui: GUI, onChange: () => void): void {
        super.addToGui(gui, onChange, 'Floor');
    }
}