import { GUI } from 'lil-gui';
import { StandardMaterialOptions } from './standard-material-options';

export class CeilingLightOptions extends StandardMaterialOptions {
    
    public intensity: number = 1;
    public width: number = 0.2;
    public length: number = 0.33;
    public height: number = 0.03;

    constructor() {
        super('white');        
    }

    public override addToGui(gui: GUI, onChange: () => void): GUI {
        const folder = super.addToGui(gui, onChange, 'Light');        
        folder.add(this, 'intensity', 0, 10, 0.1).name('Intensity').onFinishChange(onChange);
        folder.add(this, 'length', 0, 1, 0.01).name('Length (%)').onFinishChange(onChange);
        folder.add(this, 'width', 0, 1, 0.01).name('Width (%)').onFinishChange(onChange);
        folder.add(this, 'height', 0, 1, 0.01).name('Height (%)').onFinishChange(onChange);
        return folder;
    }
}