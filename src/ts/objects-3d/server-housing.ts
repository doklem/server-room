import { IServiceProvider } from '../service-provider';
import { BoxGeometry, Matrix4, Vector3 } from 'three';
import { Constants } from '../constants';
import { StandardMaterialOptions } from '../options/standard-material-options';
import { StandardInstancedMeshBase } from './standard-instanced-mesh-base';

export class ServerHousing extends StandardInstancedMeshBase<BoxGeometry> {

    public readonly soundPositions: Vector3[];

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.box, provider.options.instanceCount * 6);
        this.soundPositions = [];
    }

    public override update(): void {
        const roofRightOffset = this._provider.options.instanceCount;
        const wallLeftFrontOffset = roofRightOffset + this._provider.options.instanceCount;
        const wallLeftBackOffset = wallLeftFrontOffset + this._provider.options.instanceCount;
        const wallRightFrontOffset = wallLeftBackOffset + this._provider.options.instanceCount;
        const wallRightBackOffset = wallRightFrontOffset + this._provider.options.instanceCount;

        const x = (this._provider.options.serverRack.gapWidth + this._provider.options.serverRack.housing.width) * 0.5;

        const roofZ = this._provider.options.serverRack.roomHeight * -0.5
            + this._provider.options.serverRack.housing.height
            - this._provider.options.serverRack.housing.thickness * 0.5;
        const roofScale = new Vector3(
            this._provider.options.serverRack.housing.width,
            this._provider.options.serverRack.housing.length,
            this._provider.options.serverRack.housing.thickness);

        const wallZ = this._provider.options.serverRack.roomHeight * -0.5
            + (this._provider.options.serverRack.housing.height - this._provider.options.serverRack.housing.thickness) * 0.5;
        const wallYOffset = (this._provider.options.serverRack.housing.length - this._provider.options.serverRack.housing.thickness) * 0.5;
        const wallScale = new Vector3(
            this._provider.options.serverRack.housing.width,
            this._provider.options.serverRack.housing.thickness,
            this._provider.options.serverRack.housing.height - this._provider.options.serverRack.housing.thickness);

        const soundZ = this._provider.options.serverRack.roomHeight * -0.5
            + this._provider.options.serverRack.housing.height * 0.5;
        this.soundPositions.length = 0;

        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            this.soundPositions.push(new Vector3(x, this._provider.options.serverRack.roomLength * i, soundZ));
            this.setMatrixAt(
                i,
                new Matrix4().compose(
                    new Vector3(x, this._provider.options.serverRack.roomLength * i, roofZ),
                    Constants.DEFAULT_QUATERNION,
                    roofScale
                )
            );
            this.soundPositions.push(new Vector3(-x, this._provider.options.serverRack.roomLength * i, soundZ));
            this.setMatrixAt(
                i + roofRightOffset,
                new Matrix4().compose(
                    new Vector3(-x, this._provider.options.serverRack.roomLength * i, roofZ),
                    Constants.DEFAULT_QUATERNION,
                    roofScale
                )
            );
            this.setMatrixAt(
                i + wallLeftFrontOffset,
                new Matrix4().compose(
                    new Vector3(x, this._provider.options.serverRack.roomLength * i - wallYOffset, wallZ),
                    Constants.DEFAULT_QUATERNION,
                    wallScale
                )
            );
            this.setMatrixAt(
                i + wallLeftBackOffset,
                new Matrix4().compose(
                    new Vector3(x, this._provider.options.serverRack.roomLength * i + wallYOffset, wallZ),
                    Constants.DEFAULT_QUATERNION,
                    wallScale
                )
            );
            this.setMatrixAt(
                i + wallRightFrontOffset,
                new Matrix4().compose(
                    new Vector3(-x, this._provider.options.serverRack.roomLength * i - wallYOffset, wallZ),
                    Constants.DEFAULT_QUATERNION,
                    wallScale
                )
            );
            this.setMatrixAt(
                i + wallRightBackOffset,
                new Matrix4().compose(
                    new Vector3(-x, this._provider.options.serverRack.roomLength * i + wallYOffset, wallZ),
                    Constants.DEFAULT_QUATERNION,
                    wallScale
                )
            );
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    protected override getMaterialOptions(): StandardMaterialOptions {
        return this._provider.options.serverRack.housing;
    }
}