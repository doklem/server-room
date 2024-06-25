import { BoxGeometry, Matrix4, Texture, Vector3 } from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';

export class ServerRack extends PhysicalInstancedMeshBase<BoxGeometry> {

    constructor(options: ServerRoomOptions, geometry: BoxGeometry, environmentMap: Texture) {
        super(options, geometry, environmentMap, options.instanceCount * 2);
    }

    public update(): void {
        const z = this._options.walls.height * -0.5 + this._options.walls.height * this._options.serverRack.height * 0.5;
        const width = this._options.width * this._options.serverRack.width;
        const matrix = new Matrix4().makeScale(
            width,
            this._options.length * this._options.serverRack.length,
            this._options.walls.height * this._options.serverRack.height);
        const left = this._options.widthHalfNegative + width * 0.5;
        const right = this._options.widthHalf + width * -0.5;
        for (let i = 0; i < this._options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(left, this._options.length * i, z)));
            this.setMatrixAt(i + this._options.instanceCount, matrix.clone().setPosition(new Vector3(right, this._options.length * i, z)));
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    public override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._options.serverRack;
    }
}