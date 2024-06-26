import { GUI } from 'lil-gui';

export class CameraOptions {

    public cycleDuration: number = 6000;
    public height: number = 0.3;
    public xOffset: number = 0;
    public filmGauge: number = 35;
    public focalLength: number = 20;
    public manualControl: boolean = false;

    public addToGui(gui: GUI, onChange: () => void): void {
        const folder = gui.addFolder('Camera').close();
        folder.add(this, 'cycleDuration', 1, 10000, 1).name('Cylce Duration (ms)').onFinishChange(onChange);
        folder.add(this, 'height', 0.05, 0.95, 0.001).name('Height (%)').onChange(onChange);
        folder.add(this, 'xOffset', -0.95, 0.95, 0.001).name('Horizontal Offset (%)').onChange(onChange);
        folder.add(this, 'filmGauge', 1, 180, 0.1).name('Film Gauge').onChange(onChange);
        folder.add(this, 'focalLength', 1, 180, 0.1).name('Focal Length').onChange(onChange);
    }
}