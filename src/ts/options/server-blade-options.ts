import GUI from 'lil-gui';
import { StandardMaterialOptions } from './standard-material-options';

export class ServerBladeOptions extends StandardMaterialOptions {

    protected override readonly _folderName: string = 'Blades';

    public countHorizontal: number = 4;
    public countVertical: number = 10;
    public xOffset: number = 0.1;

    constructor() {
        super('white');
        this.envMapIntensity = 1.0;
        this.roughness = 0.3;
        this.metalness = 0;    
    }

    protected override addOptions(folder: GUI, onChange: () => void): void {
        folder.add(this, 'countHorizontal', 1, 10, 1).name('Horizontal Count').onFinishChange(onChange);
        folder.add(this, 'countVertical', 1, 40, 1).name('Vertical Count').onFinishChange(onChange);
        folder.add(this, 'xOffset', 0, 0.5, 0.001).name('Horizontal Offset (m)').onFinishChange(onChange);
        super.addOptions(folder, onChange);
    }
}