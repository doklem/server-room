import VertexShaderSource from './../shaders/quad-vertex.glsl';
import {
    GLSL3,
    Mesh,
    OrthographicCamera,
    PlaneGeometry,
    Scene,
    ShaderMaterial,
    ShaderMaterialParameters,
    Texture,
    WebGLRenderTarget,
    WebGLRenderer
} from 'three';

export class TextureGenerator {

    private static readonly GEOMETRY = new PlaneGeometry(2, 2);

    private readonly _camera: OrthographicCamera;
    private readonly _renderTarget: WebGLRenderTarget;
    private readonly _material: ShaderMaterial;
    private readonly _quad: Mesh;
    private readonly _scene: Scene;

    public get texture(): Texture {
        return this._renderTarget.texture;
    }

    constructor(private readonly _renderer: WebGLRenderer,
        shaderMaterialParameters: ShaderMaterialParameters,
        width?: number, height?: number) {
        this._camera = new OrthographicCamera(-1, 1, 1, -1, 0.01, 2);
        this._camera.position.set(0, 0, 1);
        this._renderTarget = new WebGLRenderTarget(width ?? 256, height ?? 256);
        this._renderTarget.texture.generateMipmaps = true;
        this._renderTarget.texture.needsUpdate;
        shaderMaterialParameters.precision = 'lowp';
        shaderMaterialParameters.glslVersion = GLSL3;
        shaderMaterialParameters.vertexShader = VertexShaderSource;     
        this._material = new ShaderMaterial(shaderMaterialParameters);        
        this._quad = new Mesh(TextureGenerator.GEOMETRY, this._material);
        this._scene = new Scene();
        this._scene.add(this._quad);
    }

    public render(): void {
        this._renderer.setRenderTarget(this._renderTarget);
        this._renderer.render(this._scene, this._camera);
        this._renderer.setRenderTarget(null);
    }
}