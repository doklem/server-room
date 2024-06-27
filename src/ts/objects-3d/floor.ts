import { IServiceProvider } from '../service-provider';
import { Mesh, MeshPhysicalMaterial, PlaneGeometry } from 'three';

export class Floor extends Mesh<PlaneGeometry, MeshPhysicalMaterial> {

    constructor(private readonly _provider: IServiceProvider) {
        super(_provider.geometries.plane, new MeshPhysicalMaterial({ envMap: _provider.environmentMap }));
    }

    public update(): void {
        this.position.set(
            0,
            this._provider.options.serverRack.roomLength * this._provider.options.instanceCount * 0.5 - this._provider.options.serverRack.roomLength * 0.5,
            this._provider.options.serverRack.roomHeight * -0.5);
        this.scale.set(
            this._provider.options.serverRack.roomWidth,
            this._provider.options.serverRack.roomLength * this._provider.options.instanceCount,
            1);
        this._provider.options.floor.applyToMaterial(this.material);
    }
}