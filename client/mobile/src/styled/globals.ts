import { Dimensions } from 'react-native';
import { Constants } from 'expo';

export const { height, width } = Dimensions.get('window');
export const defaultSize: string = '14';
export const avatarDimension: number = 150;
export const { statusBarHeight } = Constants;
