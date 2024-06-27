import { Matrix4, PlaneGeometry, Vector3 } from 'three';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { Constants } from '../constants';
import { IServiceProvider } from '../service-provider';

export class Wall extends PhysicalInstancedMeshBase<PlaneGeometry> {

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.plane, provider.options.instanceCount * 2);
    }

    public update(): void {
        const scale = new Vector3(this._provider.options.serverRack.roomHeight, this._provider.options.serverRack.roomLength, 1);
        const x = this._provider.options.serverRack.roomWidth * 0.5;
        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            const y = this._provider.options.serverRack.roomLength * i;
            this.setMatrixAt(
                i,
                new Matrix4().compose(new Vector3(-x, y, 0), Constants.Y_AXIS_EAST, scale)
            );
            this.setMatrixAt(
                i + this._provider.options.instanceCount,
                new Matrix4().compose(new Vector3(x, y, 0), Constants.Y_AXIS_WEST, scale)
            );
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    protected override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._provider.options.walls;
    }
}