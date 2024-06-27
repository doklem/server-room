import FragmentShaderSource from './../../shaders/ceiling-map-fragment.glsl';
import { Color, Matrix4, PlaneGeometry, Vector2, Vector3 } from 'three';
import { TextureGenerator } from '../texture-generator';
import { IServiceProvider } from '../service-provider';
import { StandardInstancedMeshBase } from './standard-instanced-mesh-base';
import { StandardMaterialOptions } from '../options/standard-material-options';

export class Ceiling extends StandardInstancedMeshBase<PlaneGeometry> {

    private readonly _mapGenerator: TextureGenerator;

    private readonly _mapShaderParameter = {
        uniforms: {
            uColor: {
                value: new Color()
            },
            uDividerColor: {
                value: new Color()
            },
            uDividerCount: {
                value: new Vector2()
            },
            uDividerStart: {
                value: 0
            }
        },
        fragmentShader: FragmentShaderSource
    };

    constructor(provider: IServiceProvider) {
        super(provider, provider.geometries.plane);

        this._mapGenerator = new TextureGenerator(provider.renderer, this._mapShaderParameter);
        this.material.map = this._mapGenerator.texture;
        this.material.needsUpdate = true;
    }

    public override update(): void {
        this._mapShaderParameter.uniforms.uColor.value.set(this._provider.options.ceiling.panelColor);
        this._mapShaderParameter.uniforms.uDividerColor.value.set(this._provider.options.ceiling.dividerColor);
        this._mapShaderParameter.uniforms.uDividerCount.value.copy(this._provider.options.ceiling.dividers);
        this._mapShaderParameter.uniforms.uDividerStart.value = this._provider.options.ceiling.dividerStart;
        this._mapGenerator.render()

        const height = this._provider.options.serverRack.roomHeight * -0.5;
        const matrix = new Matrix4().makeScale(this._provider.options.serverRack.roomWidth, this._provider.options.serverRack.roomLength, 1);
        for (let i = 0; i < this._provider.options.instanceCount; i++) {
            this.setMatrixAt(i, matrix.clone().setPosition(new Vector3(0, this._provider.options.serverRack.roomLength * i, height)));
        }
        this.instanceMatrix.needsUpdate = true;
        super.update();
    }

    protected override getMaterialOptions(): StandardMaterialOptions {
        return this._provider.options.ceiling;
    }
}