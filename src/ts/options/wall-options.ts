import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class WallOptions extends PhysicalMaterialOptions {

    constructor() {
        super('white');        
    }

    public addToGui(gui: GUI, onChange: () => void): void {
        super.addToGui(gui, onChange, 'Walls');
    }
}