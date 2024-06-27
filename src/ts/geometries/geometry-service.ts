import { BoxGeometry, BufferGeometry, PlaneGeometry } from 'three';

export class GeometryService {

    public readonly box: BoxGeometry;
    public readonly plane: PlaneGeometry;

    constructor() {
        this.box = GeometryService.initializeGeometry(new BoxGeometry(1, 1, 1));
        this.plane = GeometryService.initializeGeometry(new PlaneGeometry(1, 1));
    }

    private static initializeGeometry<T extends BufferGeometry>(geometry: T): T {
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        return geometry;
    }
}