import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';
import { IServiceProvider } from '../service-provider';
import { Constants } from '../constants';

export class ServerSoundEmitter extends Mesh<BoxGeometry, MeshBasicMaterial> {

    constructor(private readonly _provider: IServiceProvider) {
        super(new BoxGeometry(0.2, 0.2, 0.2), new MeshBasicMaterial({ color: 'green' }));
    }

    public update() {
        this.position.set(
            0,
            -(this._provider.options.serverRack.roomLength * 0.5 - this._provider.options.instanceCount * this._provider.options.serverRack.roomLength * Constants.START_OFFSET),
            0);
    }
}