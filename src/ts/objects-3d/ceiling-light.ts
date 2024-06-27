import { BoxGeometry, InstancedMesh, Matrix4, MeshStandardMaterial, Vector3 } from 'three';
import { IServiceProvider } from '../service-provider';

export class CeilingLight extends InstancedMesh<BoxGeometry, MeshStandardMaterial> {

    constructor(private readonly _provider: IServiceProvider) {
        super(
            _provider.geometries.box,
            new MeshStandardMaterial(
                {
                    color: _provider.options.ceiling.lightColor.clone(),
                    emissive: _provider.options.ceiling.lightColor.clone()
                }
            ),
            _provider.options.instanceCount);
    }

    public update(): void {
        const height = (this._provider.options.serverRack.roomHeight- this._provider.options.ceiling.lightHeight) * 0.5;
        const matrix = new Matrix4().makeScale(
            this._provider.options.serverRack.roomWidth * this._provider.options.ceiling.lightWidth,
            this._provider.options.serverRack.roomLength * this._provider.options.ceiling.lightLength,
            this._provider.options.ceiling.lightHeight);
        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this._provider.options.serverRack.roomLength * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        this.material.color.copy(this._provider.options.ceiling.lightColor);
        this.material.emissive.copy(this._provider.options.ceiling.lightColor);
        this.material.needsUpdate = true;
    }
}