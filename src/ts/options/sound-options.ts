import { GUI } from 'lil-gui';

export class SoundOptions {

    public enabled: boolean = false;
    public ambient: number = 0.5;
    public server: number = 0.75;
    public master: number = 0.5;

    public addToGui(gui: GUI, onChange: () => void): void {
        const folder = gui.addFolder('Sound').close();
        folder.add(this, 'enabled').name('Enabled').onChange(onChange);
        folder.add(this, 'master', 0, 1, 0.01).name('Master').onChange(onChange);
        folder.add(this, 'server', 0, 1, 0.01).name('Server Noise').onChange(onChange);
        folder.add(this, 'ambient', 0, 1, 0.01).name('Ambient Sound').onChange(onChange);
    }
}