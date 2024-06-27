import { BufferGeometry, InstancedMesh, MeshPhysicalMaterial } from 'three';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { IServiceProvider } from '../service-provider';

export abstract class PhysicalInstancedMeshBase<TGeometry extends BufferGeometry> extends InstancedMesh<TGeometry, MeshPhysicalMaterial> {

    constructor(protected readonly _provider: IServiceProvider, geometry: TGeometry, instanceCount?: number) {
        super(geometry, new MeshPhysicalMaterial({ envMap: _provider.environmentMap }), instanceCount ?? _provider.options.instanceCount);
    }

    public update(): void {
        this.getMaterialOptions().applyToMaterial(this.material);
    }

    protected abstract getMaterialOptions(): PhysicalMaterialOptions;
}