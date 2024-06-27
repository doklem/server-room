import { Matrix4, PlaneGeometry, Vector3 } from 'three';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { IServiceProvider } from '../service-provider';
import { Constants } from '../constants';

export class ServerBlade extends PhysicalInstancedMeshBase<PlaneGeometry> {

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.plane, provider.options.instanceCount * 2);
    }

    public override update(): void {
        const x = this._provider.options.serverRack.gapWidth * 0.5
            + this._provider.options.serverRack.blade.xOffset;
        const z = this._provider.options.serverRack.roomHeight * -0.5
            + (this._provider.options.serverRack.housing.height - this._provider.options.serverRack.housing.thickness) * 0.5;
        const scale = new Vector3(
            this._provider.options.serverRack.housing.height - this._provider.options.serverRack.housing.thickness,
            this._provider.options.serverRack.housing.length - this._provider.options.serverRack.housing.thickness * 2,
            1);

        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            this.setMatrixAt(
                i,
                new Matrix4().compose(
                    new Vector3(x, this._provider.options.serverRack.roomLength * i, z),
                    Constants.Y_AXIS_WEST,
                    scale
                )
            );
            this.setMatrixAt(
                i + this._provider.options.instanceCount,
                new Matrix4().compose(
                    new Vector3(-x, this._provider.options.serverRack.roomLength * i, z),
                    Constants.Y_AXIS_EAST,
                    scale
                )
            );
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }


    protected override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._provider.options.serverRack.blade;
    }
}