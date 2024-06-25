import {
    BoxGeometry,
    InstancedMesh,
    Matrix4,
    MeshStandardMaterial,
    Vector3
} from 'three';
import { ServerRoomOptions } from '../options/server-room-options';

export class CeilingLight extends InstancedMesh<BoxGeometry, MeshStandardMaterial> {

    constructor(private readonly _options: ServerRoomOptions, geometry: BoxGeometry) {
        super(
            geometry,
            new MeshStandardMaterial(
                {
                    color: _options.ceiling.lightColor.clone(),
                    emissive: _options.ceiling.lightColor.clone()
                }
            ),
            _options.instanceCount);
    }

    public update(): void {
        const height = (this._options.walls.height - this._options.ceiling.lightHeight) * 0.5;
        const matrix = new Matrix4().makeScale(
            this._options.width * this._options.ceiling.lightWidth,
            this._options.length * this._options.ceiling.lightLength,
            this._options.ceiling.lightHeight);
        for (let i = 0; i < this._options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this._options.length * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        this.material.color.copy(this._options.ceiling.lightColor);
        this.material.emissive.copy(this._options.ceiling.lightColor);
        this.material.needsUpdate = true;
    }
}