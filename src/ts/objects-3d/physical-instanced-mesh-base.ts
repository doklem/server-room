import { BufferGeometry, InstancedMesh, MeshPhysicalMaterial } from 'three';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { IServiceProvider } from '../service-provider';

export abstract class PhysicalInstancedMeshBase<TGeometry extends BufferGeometry> extends InstancedMesh<TGeometry, MeshPhysicalMaterial> {

    constructor(protected readonly _provider: IServiceProvider, geometry: TGeometry, instanceCount?: number) {
        super(geometry, new MeshPhysicalMaterial({ envMap: _provider.environmentMap }), instanceCount ?? _provider.options.instanceCount);
    }

    public update(): void {
        const materialOptions = this.getMaterialOptions();
        this.material.roughness = materialOptions.roughness;
        this.material.metalness = materialOptions.metalness;
        this.material.clearcoat = materialOptions.clearcoat;
        this.material.clearcoatRoughness = materialOptions.clearcoatRoughness;
        this.material.reflectivity = materialOptions.reflectivity;
        this.material.thickness = materialOptions.thickness;
        this.material.envMapIntensity = materialOptions.envMapIntensity;
        if (materialOptions.color) {
            this.material.color.set(materialOptions.color);
        }
        this.material.needsUpdate = true;
    }

    protected abstract getMaterialOptions(): PhysicalMaterialOptions;
}