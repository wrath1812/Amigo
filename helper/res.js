import { Dimensions, PixelRatio } from 'react-native';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const getOrientation = () => {
    return deviceWidth < deviceHeight ? 'portrait' : 'landscape';
};

export const calcHeight = (x) => PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);

export const getFontSizeByWindowWidth = (fontSize) => {
    const baseWidth = 320; // width of smallest iPhone
    const width = getOrientation() === 'portrait' ? deviceWidth : deviceHeight;
    return PixelRatio.roundToNearestPixel(fontSize * (width / baseWidth));
};

export const calcWidth = (x) => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);
