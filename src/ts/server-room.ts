import {
    ACESFilmicToneMapping,
    AmbientLight,
    BoxGeometry,
    Color,
    CubeCamera,
    Fog,
    PerspectiveCamera,
    PlaneGeometry,
    Scene,
    WebGLCubeRenderTarget,
    WebGLRenderer
} from 'three';
import { ServerRoomOptions } from './options/server-room-options';
import { Ceiling } from './objects-3d/ceiling';
import { Floor } from './objects-3d/floor';
import { CeilingLight } from './objects-3d/ceiling-light';
import { ServerRack } from './objects-3d/server-rack';
import { GUI } from 'lil-gui';
import { Wall } from './objects-3d/wall';
import { Constants } from './constants';

import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

export class ServerRoom {

    private readonly _environmentMapRenderTarget: WebGLCubeRenderTarget;
    private readonly _environmentMapCamera: CubeCamera;
    private readonly _scene: Scene;
    private readonly _fog: Fog;
    private readonly _renderer: WebGLRenderer;
    private readonly _camera: PerspectiveCamera;
    private readonly _floor: Floor;
    private readonly _ceiling: Ceiling;
    private readonly _ceilingLight: CeilingLight;
    private readonly _wall: Wall;
    private readonly _ambientLight: AmbientLight;
    private readonly _serverRack: ServerRack;
    private readonly _controls?: MapControls;

    private _pathZStart: number = 0;
    private _pathZLength: number = 0;
    private _cycleDuration: number = 0;

    public readonly options: ServerRoomOptions;

    constructor(private readonly _canvas: HTMLCanvasElement) {
        this.options = new ServerRoomOptions();

        const aspect = window.innerWidth / window.innerHeight;
        this._camera = new PerspectiveCamera(50, aspect, 0.01, 1000);
        this._camera.updateProjectionMatrix();
        this._camera.position.set(
            this.options.serverRack.roomWidthHalf * this.options.camera.xOffset,
            this.options.serverRack.roomHeight * -0.5 + this.options.serverRack.roomHeight * this.options.camera.height,
            this._camera.position.z
        );

        this._renderer = new WebGLRenderer(
            {
                antialias: true,
                canvas: _canvas,
            }
        );
        this._renderer.toneMapping = ACESFilmicToneMapping;
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(window.innerWidth, window.innerHeight);

        this._environmentMapRenderTarget = new WebGLCubeRenderTarget(
            300,
            {
                generateMipmaps: true,
                anisotropy: this._renderer.capabilities.getMaxAnisotropy(),
            }
        );
        this._environmentMapCamera = new CubeCamera(this._camera.near, this._camera.far, this._environmentMapRenderTarget);

        const boxGeometry = new BoxGeometry(1, 1, 1);
        boxGeometry.computeBoundingBox();
        const planeGeometry = new PlaneGeometry(1, 1);
        planeGeometry.computeBoundingBox();

        this._scene = new Scene();
        this._scene.background = this.options.ceiling.lightColor.clone();
        this._scene.rotateX(Constants.ANGLE_WEST);

        this._fog = new Fog(this.options.ceiling.lightColor.clone());
        this._fog.near = 0;
        this._scene.fog = this._fog;

        this._floor = new Floor(this.options, planeGeometry, this._environmentMapRenderTarget.texture);
        this._scene.add(this._floor);

        this._ceiling = new Ceiling(this.options, planeGeometry, this._environmentMapRenderTarget.texture, this._renderer);
        this._ceiling.rotateX(Math.PI);
        this._ceiling.rotateZ(Math.PI);
        this._scene.add(this._ceiling);

        this._ceilingLight = new CeilingLight(this.options, boxGeometry);
        this._scene.add(this._ceilingLight);

        this._wall = new Wall(this.options, planeGeometry, this._environmentMapRenderTarget.texture);
        this._scene.add(this._wall);

        this._serverRack = new ServerRack(this.options, boxGeometry, this._environmentMapRenderTarget.texture);
        this._scene.add(this._serverRack);

        this._ambientLight = new AmbientLight(this.options.ceiling.lightColor.clone(), this.options.ceiling.lightIntensity);
        this._scene.add(this._ambientLight);

        if (this.options.camera.manualControl) {
            this._controls = new MapControls(this._camera, _canvas);
            this._controls.update();
        }

        this.update();
        this.options.addToGui(new GUI({ title: 'Server Room' }), () => this.update());
    }

    public animate(time: DOMHighResTimeStamp): void {
        if (this._controls) {
            this._controls.update();
        } else {
            this._camera.position.setZ(this._pathZStart + this._pathZLength * (time % this._cycleDuration));
            this._environmentMapCamera.position.copy(this._camera.position.clone().multiply(Constants.INVERSION_X));
        }

        this._environmentMapCamera.update(this._renderer, this._scene);
        this._renderer.render(this._scene, this._camera);
    }

    public onResize(): void {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this._canvas.width = width;
        this._canvas.height = height;
        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        this._renderer.setPixelRatio(window.devicePixelRatio);
        this._renderer.setSize(width, height);
    }

    private update(): void {
        const middleZ = this.options.instanceCount * this.options.serverRack.roomLength * -0.5;
        if (!this._controls) {
            this._cycleDuration = this.options.camera.cycleDuration;
            this._pathZStart = middleZ + this.options.serverRack.roomLength * 0.5;
            this._pathZLength = this.options.serverRack.roomLength * (-1 / this._cycleDuration);
            this._camera.position.set(
                this.options.serverRack.roomWidthHalf * this.options.camera.xOffset,
                this.options.serverRack.roomHeight * -0.5 + this.options.serverRack.roomHeight * this.options.camera.height,
                this._camera.position.z
            );
        }
        this._camera.filmGauge = this.options.camera.filmGauge;
        this._camera.setFocalLength(this.options.camera.focalLength);

        this._floor.update();
        this._ceiling.update();
        this._wall.update();
        this._ceilingLight.update();
        this._serverRack.update();

        this._ambientLight.color.set(this.options.ceiling.lightColor);
        this._ambientLight.intensity = this.options.ceiling.lightIntensity;

        this._fog.far = -middleZ;
        this._fog.color.set(this._ambientLight.color);
        (this._scene.background as Color)?.copy(this._ambientLight.color);
    }
}