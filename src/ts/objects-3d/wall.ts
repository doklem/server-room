import {
    Matrix4,
    PlaneGeometry,
    Quaternion,
    Texture,
    Vector3
} from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { PhysicalInstancedMeshBase } from './physical-instanced-mesh-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { Constants } from '../constants';

export class Wall extends PhysicalInstancedMeshBase<PlaneGeometry> {

    private static readonly Y_AXIS = new Vector3(0, 1, 0);

    constructor(options: ServerRoomOptions, geometry: PlaneGeometry, environmentMap: Texture) {
        super(options, geometry, environmentMap, options.instanceCount * 2);
    }

    public update(): void {
        const scale = new Vector3(this._options.walls.height, this._options.length, 1);
        const left = new Quaternion().setFromAxisAngle(Wall.Y_AXIS, Constants.ANGLE_EAST);
        const right = new Quaternion().setFromAxisAngle(Wall.Y_AXIS, Constants.ANGLE_WEST);
        for (let i = 0; i < this._options.instanceCount; i++) {
            const y = this._options.length * i;
            this.setMatrixAt(
                i,
                new Matrix4().compose(new Vector3(this._options.widthHalfNegative, y, 0), left, scale)
            );
            this.setMatrixAt(
                i + this._options.instanceCount,
                new Matrix4().compose(new Vector3(this._options.widthHalf, y, 0), right, scale)
            );
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    protected override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._options.walls;
    }
}