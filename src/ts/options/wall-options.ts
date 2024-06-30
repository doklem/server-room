import { StandardMaterialOptions } from './standard-material-options';

export class WallOptions extends StandardMaterialOptions {

    protected override readonly _folderName: string = 'Walls';

    constructor() {
        super('white');        
    }
}