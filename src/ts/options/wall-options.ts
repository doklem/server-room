import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class WallOptions extends PhysicalMaterialOptions {
    
    public height: number = 2.5;

    constructor() {
        super('white');        
    }

    public addToGui(gui: GUI, onChange: () => void): void {
        const folder = gui.addFolder('Walls').close();
        folder.add(this, 'height', 1.8, 4, 0.1).name('Height').onFinishChange(onChange);
        super.addToGui(folder, onChange);
    }
}