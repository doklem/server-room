import { BufferGeometry, InstancedMesh, MeshStandardMaterial } from 'three';
import { IServiceProvider } from '../service-provider';
import { StandardMaterialOptions } from '../options/standard-material-options';

export abstract class StandardInstancedMeshBase<TGeometry extends BufferGeometry> extends InstancedMesh<TGeometry, MeshStandardMaterial> {

    constructor(protected readonly _provider: IServiceProvider, geometry: TGeometry, instanceCount?: number) {
        super(geometry, new MeshStandardMaterial({ envMap: _provider.environmentMap }), instanceCount ?? _provider.options.instanceCount);
    }

    public update(): void {
        const materialOptions = this.getMaterialOptions();
        this.material.roughness = materialOptions.roughness;
        this.material.metalness = materialOptions.metalness;
        this.material.envMapIntensity = materialOptions.envMapIntensity;
        if (materialOptions.color) {
            this.material.color.set(materialOptions.color);
        }
        this.material.needsUpdate = true;
    }

    protected abstract getMaterialOptions(): StandardMaterialOptions;
}