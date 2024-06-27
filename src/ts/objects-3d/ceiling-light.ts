import { BoxGeometry, Matrix4, Vector3 } from 'three';
import { IServiceProvider } from '../service-provider';
import { StandardInstancedMeshBase } from './standard-instanced-mesh-base';
import { StandardMaterialOptions } from '../options/standard-material-options';

export class CeilingLight extends StandardInstancedMeshBase<BoxGeometry> {

    constructor(private readonly provider: IServiceProvider) {
        super(provider, provider.geometries.box);
        if (provider.options.ceiling.light.color) {
            this.material.emissive = provider.options.ceiling.light.color.clone();
            this.material.needsUpdate = true;
        }
    }

    public update(): void {
        const height = (this.provider.options.serverRack.roomHeight- this.provider.options.ceiling.light.height) * 0.5;
        const matrix = new Matrix4().makeScale(
            this.provider.options.serverRack.roomWidth * this.provider.options.ceiling.light.width,
            this.provider.options.serverRack.roomLength * this.provider.options.ceiling.light.length,
            this.provider.options.ceiling.light.height);
        for (let i = 0; i < this.provider.options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this.provider.options.serverRack.roomLength * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        if (this.provider.options.ceiling.light.color) {
            this.material.emissive.copy(this.provider.options.ceiling.light.color);
        }
        super.update();
    }

    protected override getMaterialOptions(): StandardMaterialOptions {
        return this.provider.options.ceiling.light;
    }
}