import {
    ACESFilmicToneMapping,
    AmbientLight,
    Color,
    CubeCamera,
    Fog,
    PerspectiveCamera,
    Scene,
    Texture,
    WebGLCubeRenderTarget,
    WebGLRenderer
} from 'three';
import { ServerRoomOptions } from './options/server-room-options';
import { Ceiling } from './objects-3d/ceiling';
import { Floor } from './objects-3d/floor';
import { CeilingLight } from './objects-3d/ceiling-light';
import { GUI } from 'lil-gui';
import { Wall } from './objects-3d/wall';
import { Constants } from './constants';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import { IServiceProvider } from './service-provider';
import { GeometryService } from './geometries/geometry-service';
import { ServerHousing } from './objects-3d/server-housing';
import { ServerBlade } from './objects-3d/server-blade';
import { SoundService } from './sound-service';
import { ServerSoundEmitter } from './objects-3d/server-sound-emitter';

export class ServerRoom implements IServiceProvider {

    private readonly _environmentMapRenderTarget: WebGLCubeRenderTarget;
    private readonly _environmentMapCamera: CubeCamera;
    private readonly _scene: Scene;
    private readonly _fog: Fog;
    private readonly _camera: PerspectiveCamera;
    private readonly _floor: Floor;
    private readonly _ceiling: Ceiling;
    private readonly _ceilingLight: CeilingLight;
    private readonly _wall: Wall;
    private readonly _ambientLight: AmbientLight;
    private readonly _serverHousing: ServerHousing;
    private readonly _serverBlade: ServerBlade;
    private readonly _serverSoundEmitter: ServerSoundEmitter;
    private readonly _controls?: MapControls;

    private _pathZStart: number = 0;
    private _pathZLength: number = 0;
    private _cycleDuration: number = 0;

    public readonly options: ServerRoomOptions;
    public readonly geometries: GeometryService;
    public readonly renderer: WebGLRenderer;

    public sounds: SoundService;

    public get environmentMap(): Texture {
        return this._environmentMapRenderTarget.texture;
    }

    constructor(private readonly _canvas: HTMLCanvasElement) {
        this.options = new ServerRoomOptions();
        this.geometries = new GeometryService();

        const aspect = window.innerWidth / window.innerHeight;
        this._camera = new PerspectiveCamera(50, aspect, 0.01, 500);
        this._camera.updateProjectionMatrix();
        this._camera.position.set(
            this.options.serverRack.roomWidthHalf * this.options.camera.xOffset,
            this.options.serverRack.roomHeight * -0.5 + this.options.serverRack.roomHeight * this.options.camera.height,
            this._camera.position.z
        );

        this.renderer = new WebGLRenderer(
            {
                antialias: true,
                canvas: _canvas,
            }
        );
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this._environmentMapRenderTarget = new WebGLCubeRenderTarget(
            300,
            {
                generateMipmaps: true,
                anisotropy: this.renderer.capabilities.getMaxAnisotropy(),
            }
        );
        this._environmentMapCamera = new CubeCamera(this._camera.near, this._camera.far, this._environmentMapRenderTarget);

        this._scene = new Scene();
        this._scene.background = this.options.ambientLight.clone();
        this._scene.rotateX(Constants.ANGLE_WEST);

        this._fog = new Fog(this.options.ambientLight.clone());
        this._fog.near = 0;
        this._scene.fog = this._fog;

        this._floor = new Floor(this);
        this._scene.add(this._floor);

        this._ceiling = new Ceiling(this);
        this._ceiling.rotateX(Math.PI);
        this._ceiling.rotateZ(Math.PI);
        this._scene.add(this._ceiling);

        this._ceilingLight = new CeilingLight(this);
        this._scene.add(this._ceilingLight);

        this._wall = new Wall(this);
        this._scene.add(this._wall);

        this._serverHousing = new ServerHousing(this);
        this._scene.add(this._serverHousing);

        this._serverBlade = new ServerBlade(this);
        this._scene.add(this._serverBlade);

        this._serverSoundEmitter = new ServerSoundEmitter(this);
        this._scene.add(this._serverSoundEmitter);

        this.sounds = new SoundService(this, this._serverSoundEmitter);

        this._ambientLight = new AmbientLight(this.options.ambientLight.clone(), this.options.ambientLightIntensity);
        this._scene.add(this._ambientLight);

        if (this.options.camera.manualControl) {
        this._controls = new MapControls(this._camera, _canvas);
        this._controls.update();
        }

        this.updateGraphic();
        this.updateCamera();
        this.options.addToGui(
            new GUI({ title: 'Server Room' }),
            () => this.updateGraphic(),
            () => this.updateCamera(),
            () => {
                if (!this.sounds.loaded) {
                    this.sounds.loadAsync(this._camera);
                } else {
                    this.sounds.update();
                }
            }
        );
    }

    public animate(time: DOMHighResTimeStamp): void {
        if (this._controls) {
            this._controls.update();
        } else {
            this._camera.position.setZ(this._pathZStart + this._pathZLength * (time % this._cycleDuration));
            this._environmentMapCamera.position.copy(this._camera.position.clone().multiply(Constants.INVERSION_X));
        }

        this._environmentMapCamera.update(this.renderer, this._scene);
        this.renderer.render(this._scene, this._camera);
    }

    public onResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._canvas.width = width;
        this._canvas.height = height;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(width, height);
    }

    private updateGraphic(): void {
        this._floor.update();
        this._ceiling.update();
        this._wall.update();
        this._ceilingLight.update();
        this._serverHousing.update();
        this._serverBlade.update();
        this._serverSoundEmitter.update();

        this._ambientLight.color.set(this.options.ambientLight);
        this._ambientLight.intensity = this.options.ambientLightIntensity;

        this._fog.color.set(this._ambientLight.color);
        (this._scene.background as Color)?.copy(this._ambientLight.color);
    }

    private updateCamera(): void {
        if (!this._controls) {
            this._cycleDuration = this.options.camera.cycleDuration;
            this._pathZStart = this.options.serverRack.roomLength * 0.5 - this.options.instanceCount * this.options.serverRack.roomLength * Constants.START_OFFSET;
            this._pathZLength = this.options.serverRack.roomLength * (-1 / this._cycleDuration);
            this._camera.position.set(
                this.options.serverRack.roomWidthHalf * this.options.camera.xOffset,
                this.options.serverRack.roomHeight * -0.5 + this.options.serverRack.roomHeight * this.options.camera.height,
                this._camera.position.z
            );
        }
        this._camera.far = this.options.instanceCount * this.options.serverRack.roomLength * (1 - Constants.START_OFFSET);
        this._camera.filmGauge = this.options.camera.filmGauge;
        this._camera.setFocalLength(this.options.camera.focalLength);

        this._fog.far = this._camera.far;
    }
}