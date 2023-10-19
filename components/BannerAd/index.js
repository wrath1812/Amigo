import BannerAd from './BannerAd';
import SampleBox from './SampleBox';
import { ENV } from '@env';

const BannerAdComponent = ENV === 'production' ? BannerAd : SampleBox;

export default BannerAdComponent;
