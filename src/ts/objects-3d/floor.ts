import { PlaneGeometry, Texture } from 'three';
import { ServerRoomOptions } from '../options/server-room-options';
import { HorizontalBarrierBase } from './horizontal-barrier-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';

export class Floor extends HorizontalBarrierBase {

    constructor(options: ServerRoomOptions, geometry: PlaneGeometry, environmentMap: Texture) {
        super(options, geometry, environmentMap);
    }

    public override getPhysicalMaterialOptions(): PhysicalMaterialOptions {
        return this._options.floor;
    }
}