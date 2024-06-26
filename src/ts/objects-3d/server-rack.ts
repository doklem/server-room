import { BoxGeometry, Matrix4, Texture, Vector3 } from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';

export class ServerRack extends PhysicalInstancedMeshBase<BoxGeometry> {

    constructor(options: ServerRoomOptions, geometry: BoxGeometry, environmentMap: Texture) {
        super(options, geometry, environmentMap, options.instanceCount * 2);
    }

    public update(): void {
        const z = this._options.serverRack.roomHeight * -0.5 + this._options.serverRack.rackHeight * 0.5;
        const matrix = new Matrix4().makeScale(this._options.serverRack.rackWidth, this._options.serverRack.rackLength, this._options.serverRack.rackHeight);
        const left = this._options.serverRack.roomWidthHalfNegative + this._options.serverRack.rackWidth * 0.5;
        const right = this._options.serverRack.roomWidthHalf + this._options.serverRack.rackWidth * -0.5;
        for (let i = 0; i < this._options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(left, this._options.serverRack.roomLength * i, z)));
            this.setMatrixAt(i + this._options.instanceCount, matrix.clone().setPosition(new Vector3(right, this._options.serverRack.roomLength * i, z)));
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    public override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._options.serverRack;
    }
}