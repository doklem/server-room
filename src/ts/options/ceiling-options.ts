import { Color, Vector2 } from 'three';
import { GUI } from 'lil-gui';
import { PhysicalMaterialOptions } from './physical-material-options';

export class CeilingOptions extends PhysicalMaterialOptions {
    
    public readonly color: Color = new Color('lightgray');
    public readonly dividerColor: Color = new Color('gray');
    public readonly lightColor: Color = new Color('white');
    public readonly dividers: Vector2 = new Vector2(5, 3);
    public readonly dividerStart: number = 0.05;
    
    public lightIntensity: number = 1;
    public lightWidth: number = 0.2;
    public lightLength: number = 0.33;
    public lightHeight: number = 0.03;

    public addToGui(gui: GUI, onChange: () => void): void {        
        const folder = gui.addFolder('Ceiling').close();
        
        const dividerFolder = folder.addFolder('Gaps').close();
        dividerFolder.addColor(this, 'dividerColor').name('Color').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'x', 0, 7, 1).name('Vertical Count').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'y', 0, 7, 1).name('Horizontal Count').onFinishChange(onChange);
        dividerFolder.add(this, 'dividerStart', 0, 1, 0.0001).name('Width (%)').onFinishChange(onChange);

        const lightFolder = folder.addFolder('Light').close();
        lightFolder.addColor(this, 'lightColor').name('Color').onFinishChange(onChange);
        lightFolder.add(this, 'lightIntensity', 0, 10, 0.1).name('Intensity').onFinishChange(onChange);
        lightFolder.add(this, 'lightLength', 0, 1, 0.01).name('Length (%)').onFinishChange(onChange);
        lightFolder.add(this, 'lightWidth', 0, 1, 0.01).name('Width (%)').onFinishChange(onChange);
        lightFolder.add(this, 'lightHeight', 0, 1, 0.01).name('Height (%)').onFinishChange(onChange);

        super.addToGui(folder, onChange);
    }
}