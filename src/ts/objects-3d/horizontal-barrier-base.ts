import { Matrix4, PlaneGeometry, Vector3 } from 'three';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { IServiceProvider } from '../service-provider';

export abstract class HorizontalBarrierBase extends PhysicalInstancedMeshBase<PlaneGeometry> {

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.plane);
    }

    public update(): void {
        const height = this._provider.options.serverRack.roomHeight * -0.5;
        const matrix = new Matrix4().makeScale(this._provider.options.serverRack.roomWidth, this._provider.options.serverRack.roomLength, 1);
        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this._provider.options.serverRack.roomLength * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }
}