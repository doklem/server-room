import { BufferGeometry, InstancedMesh, MeshPhysicalMaterial } from 'three';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { IServiceProvider } from '../service-provider';

export abstract class PhysicalInstancedMeshBase<TGeometry extends BufferGeometry> extends InstancedMesh<TGeometry, MeshPhysicalMaterial> {

    constructor(protected readonly _provider: IServiceProvider, geometry: TGeometry, instanceCount?: number) {
        super(geometry, new MeshPhysicalMaterial({ envMap: _provider.environmentMap }), instanceCount ?? _provider.options.instanceCount);
    }

    public update(): void {
        const physicalMaterialOptions = this.getPhysicalMaterialOptions();
        this.material.roughness = physicalMaterialOptions.roughness;
        this.material.metalness = physicalMaterialOptions.metalness;
        this.material.clearcoat = physicalMaterialOptions.clearcoat;
        this.material.clearcoatRoughness = physicalMaterialOptions.clearcoatRoughness;
        this.material.reflectivity = physicalMaterialOptions.reflectivity;
        this.material.thickness = physicalMaterialOptions.thickness;
        this.material.envMapIntensity = physicalMaterialOptions.envMapIntensity;
        if (physicalMaterialOptions.color) {
            this.material.color.set(physicalMaterialOptions.color);
        }
        this.material.needsUpdate = true;
    }

    protected abstract getPhysicalMaterialOptions(): PhysicalMaterialOptions;
}