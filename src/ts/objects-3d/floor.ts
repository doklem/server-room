import { HorizontalBarrierBase } from './horizontal-barrier-base';
import { PhysicalMaterialOptions } from '../options/physical-material-options';

export class Floor extends HorizontalBarrierBase {

    protected override getMaterialOptions(): PhysicalMaterialOptions {
        return this._provider.options.floor;
    }
}