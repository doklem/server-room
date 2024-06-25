import FragmentShaderSource from './../../shaders/ceiling-map-fragment.glsl';
import { Color, PlaneGeometry, Texture, Vector2, WebGLRenderer } from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { HorizontalBarrierBase } from './horizontal-barrier-base';
import { TextureGenerator } from '../texture-generator';
import { PhysicalMaterialOptions } from '../options/physical-material-options';

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

    constructor(
        options: ServerRoomOptions,
        geometry: PlaneGeometry,
        environmentMap: Texture,
        renderer: WebGLRenderer) {
        super(options, geometry, environmentMap);

        this._mapGenerator = new TextureGenerator(renderer, this._mapShaderParameter);
        this.material.map = this._mapGenerator.texture;
        this.material.needsUpdate = true;
    }

    public override update(): void {
        this._mapShaderParameter.uniforms.uColor.value.set(this._options.ceiling.color);
        this._mapShaderParameter.uniforms.uDividerColor.value.set(this._options.ceiling.dividerColor);
        this._mapShaderParameter.uniforms.uDividerCount.value.copy(this._options.ceiling.dividers);
        this._mapShaderParameter.uniforms.uDividerStart.value = this._options.ceiling.dividerStart;
        this._mapGenerator.render()
        super.update();
    }

    public override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._options.ceiling;
    }
}