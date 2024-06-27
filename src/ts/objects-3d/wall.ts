import { Matrix4, PlaneGeometry, Vector3 } from 'three';
import { Constants } from '../constants';
import { IServiceProvider } from '../service-provider';
import { StandardInstancedMeshBase } from './standard-instanced-mesh-base';
import { StandardMaterialOptions } from '../options/standard-material-options';

export class Wall extends StandardInstancedMeshBase<PlaneGeometry> {

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.plane, 2);
    }

    public update(): void {
        const scale = new Vector3(
            this._provider.options.serverRack.roomHeight,
            this._provider.options.serverRack.roomLength * this._provider.options.instanceCount,
            1);
        const x = this._provider.options.serverRack.roomWidth * 0.5;
        const y = this._provider.options.serverRack.roomLength * this._provider.options.instanceCount * 0.5 - this._provider.options.serverRack.roomLength * 0.5;
        this.setMatrixAt(
            0,
            new Matrix4().compose(new Vector3(-x, y, 0), Constants.Y_AXIS_EAST, scale)
        );
        this.setMatrixAt(
            1,
            new Matrix4().compose(new Vector3(x, y, 0), Constants.Y_AXIS_WEST, scale)
        );
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    protected override getMaterialOptions(): StandardMaterialOptions {
        return this._provider.options.walls;
    }
}