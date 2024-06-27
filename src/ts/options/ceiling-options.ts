import { Color, Vector2 } from 'three';
import { GUI } from 'lil-gui';
import { CeilingLightOptions } from './ceiling-light-options';
import { StandardMaterialOptions } from './standard-material-options';

export class CeilingOptions extends StandardMaterialOptions {
    
    public readonly panelColor: Color = new Color('lightgray');
    public readonly dividerColor: Color = new Color('gray');
    public readonly dividers: Vector2 = new Vector2(5, 3);
    public readonly dividerStart: number = 0.05;
    public readonly light: CeilingLightOptions = new CeilingLightOptions();

    public override addToGui(gui: GUI, onChange: () => void): GUI {        
        const folder = gui.addFolder('Ceiling').close();

        const panelFolder = super.addToGui(folder, onChange, 'Panels');
        panelFolder.addColor(this, 'panelColor').name('Color').onFinishChange(onChange);
        
        const dividerFolder = folder.addFolder('Gaps').close();
        dividerFolder.addColor(this, 'dividerColor').name('Color').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'x', 0, 7, 1).name('Vertical Count').onFinishChange(onChange);
        dividerFolder.add(this.dividers, 'y', 0, 7, 1).name('Horizontal Count').onFinishChange(onChange);
        dividerFolder.add(this, 'dividerStart', 0, 1, 0.0001).name('Width (%)').onFinishChange(onChange);

        this.light.addToGui(folder, onChange);

        return folder;
    }
}