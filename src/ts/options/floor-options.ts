import { PhysicalMaterialOptions } from './physical-material-options';

export class FloorOptions extends PhysicalMaterialOptions {

    protected override readonly _folderName: string = 'Floor';

    constructor() {
        super('lightgray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 0;
        this.clearcoat = 1;
        this.clearcoatRoughness = 0;
        this.thickness = 0;
        this.reflectivity = 1;
    }
}