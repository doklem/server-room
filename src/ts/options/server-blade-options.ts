import GUI from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class ServerBladeOptions extends PhysicalMaterialOptions {

    public countHorizontal: number = 4;
    public countVertical: number = 10;
    public xOffset: number = 0.05;

    constructor() {
        super('lightgray');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 1;    
    }

    public override addToGui(gui: GUI, onChange: () => void): GUI {
        const folder = gui.addFolder('Blades').close();
        folder.add(this, 'countHorizontal', 1, 10, 1).name('Horizontal Count').onFinishChange(onChange);
        folder.add(this, 'countVertical', 1, 40, 1).name('Vertical Count').onFinishChange(onChange);
        folder.add(this, 'xOffset', 0, 0.5, 0.001).name('Horizontal Offset (m)').onFinishChange(onChange);
        super.addToGui(folder, onChange);
        return folder;
    }
}