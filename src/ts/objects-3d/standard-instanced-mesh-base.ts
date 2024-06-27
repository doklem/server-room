import { BufferGeometry, InstancedMesh, MeshStandardMaterial } from 'three';
import { IServiceProvider } from '../service-provider';
import { StandardMaterialOptions } from '../options/standard-material-options';

export abstract class StandardInstancedMeshBase<TGeometry extends BufferGeometry> extends InstancedMesh<TGeometry, MeshStandardMaterial> {

    constructor(protected readonly _provider: IServiceProvider, geometry: TGeometry, instanceCount?: number) {
        super(geometry, new MeshStandardMaterial({ envMap: _provider.environmentMap }), instanceCount ?? _provider.options.instanceCount);
    }

    public update(): void {
        this.getMaterialOptions().applyToMaterial(this.material);
    }

    protected abstract getMaterialOptions(): StandardMaterialOptions;
}