import { ENV } from '@env';

import BannerAd from './BannerAd';
import SampleBox from './SampleBox';

const BannerAdComponent = ENV === 'production' ? BannerAd : SampleBox;

export default BannerAdComponent;
