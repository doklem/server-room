import FragmentShaderSource from './../../shaders/ceiling-map-fragment.glsl';
import { Color, Vector2 } from 'three';
import { HorizontalBarrierBase } from './horizontal-barrier-base';
import { TextureGenerator } from '../texture-generator';
import { PhysicalMaterialOptions } from '../options/physical-material-options';
import { IServiceProvider } from '../service-provider';

export class Ceiling extends HorizontalBarrierBase {

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
        super(provider);

        this._mapGenerator = new TextureGenerator(provider.renderer, this._mapShaderParameter);
        this.material.map = this._mapGenerator.texture;
        this.material.needsUpdate = true;
    }

    public override update(): void {
        this._mapShaderParameter.uniforms.uColor.value.set(this._provider.options.ceiling.color);
        this._mapShaderParameter.uniforms.uDividerColor.value.set(this._provider.options.ceiling.dividerColor);
        this._mapShaderParameter.uniforms.uDividerCount.value.copy(this._provider.options.ceiling.dividers);
        this._mapShaderParameter.uniforms.uDividerStart.value = this._provider.options.ceiling.dividerStart;
        this._mapGenerator.render()
        super.update();
    }

    protected override getMaterialOptions(): PhysicalMaterialOptions {
        return this._provider.options.ceiling;
    }
}