import { Color, Vector2 } from 'three';
import { GUI } from 'lil-gui';
import { CeilingLightOptions } from './ceiling-light-options';
import { StandardMaterialOptions } from './standard-material-options';

export class CeilingOptions extends StandardMaterialOptions {

    protected override readonly _folderName: string = 'Ceiling';
    
    public readonly panelColor: Color = new Color('lightgray');
    public readonly dividerColor: Color = new Color('gray');
    public readonly dividers: Vector2 = new Vector2(5, 3);
    public readonly dividerStart: number = 0.03;
    public readonly light: CeilingLightOptions = new CeilingLightOptions();

    protected override addOptions(gui: GUI, onChange: () => void): void {
        const panelFolder = gui.addFolder('Panels').close();
        panelFolder.addColor(this, 'panelColor').name('Color').onFinishChange(onChange);
        super.addOptions(panelFolder, onChange);
        
        const dividerFolder = gui.addFolder('Gaps').close();
        dividerFolder.addColor(this, 'dividerColor').name('Color').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'x', 0, 7, 1).name('Vertical Count').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'y', 0, 7, 1).name('Horizontal Count').onFinishChange(onChange);
        dividerFolder.add(this, 'dividerStart', 0, 1, 0.0001).name('Width (%)').onFinishChange(onChange);

        this.light.addToGui(gui, onChange);
    }
}