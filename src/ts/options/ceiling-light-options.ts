import { GUI } from 'lil-gui';
import { StandardMaterialOptions } from './standard-material-options';

export class CeilingLightOptions extends StandardMaterialOptions {

    protected override readonly _folderName: string = 'Light';
    
    public intensity: number = 0.3;
    public width: number = 0.2;
    public length: number = 0.33;
    public height: number = 0.03;

    constructor() {
        super('white');        
    }

    protected override addOptions(gui: GUI, onChange: () => void): void {
        gui.add(this, 'intensity', 0, 10, 0.01).name('Intensity').onFinishChange(onChange);
        gui.add(this, 'length', 0, 1, 0.01).name('Length (%)').onFinishChange(onChange);
        gui.add(this, 'width', 0, 1, 0.01).name('Width (%)').onFinishChange(onChange);
        gui.add(this, 'height', 0, 1, 0.01).name('Height (%)').onFinishChange(onChange);
        super.addOptions(gui, onChange);
    }
}