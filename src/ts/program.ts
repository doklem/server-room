import { ServerRoom } from './server-room';

export class Program {

    private readonly _display: HTMLCanvasElement;
    private readonly _serverRoom: ServerRoom;

    constructor() {
        this._display = document.getElementById('display') as HTMLCanvasElement;
        this._serverRoom = new ServerRoom(this._display);
        window.addEventListener('resize', this.onResize, false);
    }

    public animate(time: DOMHighResTimeStamp): void {
        this._serverRoom.animate(time);
        requestAnimationFrame(async (t: DOMHighResTimeStamp) => this.animate(t));
    }

    public dispose() {
        window.removeEventListener('resize', this.onResize, false);
    }

    private onResize = (): void => {
        this._serverRoom.onResize();
    }
}

try {
    const program = new Program();
    requestAnimationFrame(async (t: DOMHighResTimeStamp) => program.animate(t));
}
catch (e) {
    console.error(e);
    alert(e);
}