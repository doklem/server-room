import { Texture, WebGLRenderer } from 'three';
import { GeometryService } from './geometries/geometry-service';
import { ServerRoomOptions } from './options/server-room-options';

export interface IServiceProvider {
    readonly environmentMap: Texture;
    readonly geometries: GeometryService;
    readonly options: ServerRoomOptions;
    readonly renderer: WebGLRenderer;
}