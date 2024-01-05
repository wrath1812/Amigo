import React from 'react';
import { Image } from 'react-native';
import { calcHeight } from '../helper/res';

// Common style for icons
const style = {
    width: calcHeight(10),
    height: calcHeight(10),
};

// Function to generate deeplinks with checks for undefined parameters
const generateDeeplink = (baseURL, params) => {
    let queryString = '';

    for (const key in params) {
        if (params.hasOwnProperty(key) && params[key] !== undefined) {
            queryString += `${encodeURIComponent(key)}=${encodeURIComponent(
                params[key],
            )}&`;
        }
    }

    // Remove the last '&' character from the queryString
    queryString = queryString.slice(0, -1);

    return `${baseURL}://upi/pay?${queryString}`;
};

// Data for each payment option
const paymentOptions = [
    {
        name: 'Google Pay',
        baseURL: 'tez',
        iconURI: '../assets/icons/upi/gPay.png',
    },
    {
        name: 'PhonePe',
        baseURL: 'phonepe',
        iconURI: '../assets/icons/upi/phonePe.png',
    },
    {
        name: 'Paytm',
        baseURL: 'paytmmp',
        iconURI:
            'https://commons.wikimedia.org/wiki/File:Paytm_Logo_(standalone).svg',
    },
    {
        name: 'Amazon Pay',
        baseURL: 'amazonpay',
        iconURI: 'https://commons.wikimedia.org/wiki/File:Amazon_Pay_logo.svg',
    },
    {
        name: 'CRED',
        baseURL: 'cred',
        iconURI: 'https://logotaglines.com/cred-logo-tagline/',
    },
    {
        name: 'BHIM UPI',
        baseURL: 'bhim',
        iconURI: 'https://commons.wikimedia.org/wiki/File:BHIM_logo.svg',
    },
    {
        name: 'Default UPI App',
        baseURL: 'upi',
        iconURI: 'https://example.com/default-upi-app-logo.svg', // Replace with actual URI
    },
];

// Map over the data to create the final array of payment methods
const paymentMethods = paymentOptions.map((option) => ({
    name: option.name,
    generateDeeplink: (params) => generateDeeplink(option.baseURL, params),
    icon: <Image source={{ uri: option.iconURI }} style={style} />,
}));

export default paymentMethods;
