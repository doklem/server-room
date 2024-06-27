import { GUI } from 'lil-gui';
import { StandardMaterialOptions } from './standard-material-options';

export class WallOptions extends StandardMaterialOptions {

    constructor() {
        super('white');        
    }

    public override addToGui(gui: GUI, onChange: () => void): GUI {
        return super.addToGui(gui, onChange, 'Walls');
    }
}