import GUI from 'lil-gui';
import { StandardMaterialOptions } from './standard-material-options';

export class ServerHousingOptions extends StandardMaterialOptions {

    public width: number = 2;
    public length: number = 4;
    public height: number = 2;
    public thickness: number = 0.05;

    constructor() {
        super('gray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 1;    
    }

    public override addToGui(gui: GUI, onChange: () => void): GUI {
        const folder = gui.addFolder('Housing').close();
        folder.add(this, 'length', 0.001, 6, 0.001).name('Length (m)').onFinishChange(onChange);
        folder.add(this, 'width', 0.001, 3, 0.001).name('Width (m)').onFinishChange(onChange);
        folder.add(this, 'height', 0.001, 3, 0.001).name('Height (m)').onFinishChange(onChange);
        folder.add(this, 'thickness', 0.001, 0.5, 0.001).name('Thickness (m)').onFinishChange(onChange);
        super.addToGui(folder, onChange);
        return folder;
    }
}