import { Texture, WebGLRenderer } from 'three';
import { GeometryService } from './geometries/geometry-service';
import { ServerRoomOptions } from './options/server-room-options';
import { SoundService } from './sound-service';

export interface IServiceProvider {
    readonly environmentMap: Texture;
    readonly geometries: GeometryService;
    readonly options: ServerRoomOptions;
    readonly renderer: WebGLRenderer;
    readonly sounds: SoundService;
}