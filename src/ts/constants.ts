import { Quaternion, Vector3 } from 'three';

export class Constants {
    public static readonly ANGLE_WEST = Math.PI * -0.5;
    public static readonly ANGLE_EAST = Math.PI * 0.5;

    public static readonly INVERSION_X = new Vector3(-1, 1, 1);

    public static readonly DEFAULT_QUATERNION: Quaternion = new Quaternion();

    public static readonly Y_AXIS = new Vector3(0, 1, 0);
    
    public static readonly Y_AXIS_EAST = new Quaternion().setFromAxisAngle(Constants.Y_AXIS, Constants.ANGLE_EAST);
    public static readonly Y_AXIS_WEST = new Quaternion().setFromAxisAngle(Constants.Y_AXIS, Constants.ANGLE_WEST);
}