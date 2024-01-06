import { Image } from 'react-native';
import { calcHeight } from '../helper/res';
import GPayLogo from '../assets/icons/upi/gPay.png';
import PhonePeLogo from '../assets/icons/upi/phonePe.png';

const style = {
    width: calcHeight(10),
    height: calcHeight(10),
};

const createIcon = (source) => <Image source={source} style={style} />;

const generateDeeplink = (baseURL, params) => {
    const queryParams = Object.entries(params)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    return `${baseURL}${queryParams}`;
};

export default [
    {
        name: 'Google Pay',
        generateDeeplink: (params) =>
            generateDeeplink('tez://upi/pay?', params),
        icon: createIcon(GPayLogo),
    },
    {
        name: 'PhonePe',
        generateDeeplink: (params) =>
            generateDeeplink('phonepe://pay?', params),
        icon: createIcon(PhonePeLogo),
    },
    {
        name: 'Paytm',
        generateDeeplink: (params) =>
            generateDeeplink('paytmmp://pay?', params),
        icon: createIcon({
            uri: 'https://commons.wikimedia.org/wiki/File:Paytm_Logo_(standalone).svg',
        }),
    },
    {
        name: 'Amazon Pay',
        generateDeeplink: (params) =>
            generateDeeplink('amazonpay://pay?', params),
        icon: createIcon({
            uri: 'https://commons.wikimedia.org/wiki/File:Amazon_Pay_logo.svg',
        }),
    },
    {
        name: 'CRED',
        generateDeeplink: (params) =>
            generateDeeplink('cred://upi/pay?', params),
        icon: createIcon({
            uri: 'https://logotaglines.com/cred-logo-tagline/',
        }),
    },
    {
        name: 'BHIM UPI',
        generateDeeplink: (params) =>
            generateDeeplink('bhim://upi/pay?', params),
        icon: createIcon({
            uri: 'https://commons.wikimedia.org/wiki/File:BHIM_logo.svg',
        }),
    },
    {
        name: 'Default UPI App',
        generateDeeplink: (params) => generateDeeplink('upi://pay?', params),
        icon: createIcon({
            uri: 'https://example.com/default_upi_app_logo.svg',
        }), // Replace with actual logo URI
    },
];
