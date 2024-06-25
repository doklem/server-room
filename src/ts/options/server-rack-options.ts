import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class ServerRackOptions extends PhysicalMaterialOptions {

    public width: number = 0.25;
    public length: number = 0.85;
    public height: number = 0.7;

    constructor() {
        super('gray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 1;
    }

    public addToGui(gui: GUI, onChange: () => void): void {
        const folder = gui.addFolder('ServerRack').close();
        folder.add(this, 'width', 0, 0.5, 0.001).name('Width').onFinishChange(onChange);
        folder.add(this, 'length', 0.01, 1, 0.001).name('Length').onFinishChange(onChange);
        folder.add(this, 'height', 0.1, 1, 0.001).name('Height').onFinishChange(onChange);
        super.addToGui(folder, onChange);
    }
}