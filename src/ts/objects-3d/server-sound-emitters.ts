import { Group, Object3D } from 'three';
import { IServiceProvider } from '../service-provider';
import { ServerHousing } from './server-housing';

export class ServerSoundEmitters extends Group {

    constructor(provider: IServiceProvider, private readonly _serverHousing: ServerHousing) {
        super();
        for (let i = 0; i < provider.options.instanceCount; i++) {
            this.add(new Object3D());
            this.add(new Object3D());
        }
    }

    public update() {
        this.children.forEach((child: Object3D, index: number) => {
            child.position.copy(this._serverHousing.soundPositions[index]);
        });
    }
}