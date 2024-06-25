import {
    Matrix4,
    PlaneGeometry,
    Texture,
    Vector3
} from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';

export abstract class HorizontalBarrierBase extends PhysicalInstancedMeshBase<PlaneGeometry> {

    constructor(options: ServerRoomOptions, geometry: PlaneGeometry, environmentMap: Texture) {
        super(options, geometry, environmentMap);
    }

    public update(): void {
        const height = this._options.walls.height * -0.5;
        const matrix = new Matrix4().makeScale(this._options.width, this._options.length, 1);
        for (let i = 0; i < this._options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this._options.length * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }
}