import { Image } from "react-native";
import {calcHeight} from "../helper/res";
import GPayLogo from "../assets/icons/upi/gPay.png";
import PhonePeLogo from "../assets/icons/upi/phonePe.png";
const style={
    width:calcHeight(10),
    height:calcHeight(10)
}
export default [
    {
        "name": "Google Pay",
        "generateDeeplink": function(params) {
            return `gpay://pay?am=${params.am}&cu=${params.cu}&mc=${params.mc}&pa=${params.pa}&pn=${params.pn}&tn=${params.tn}&tr=${params.tr}`;
        },
        "icon": <Image source={GPayLogo}  style={style} />
    },
    {
        "name": "PhonePe",
        "generateDeeplink": function(params) {
            return `phonepe://pay?am=${params.am}&cu=${params.cu}&mc=${params.mc}&pa=${params.pa}&pn=${params.pn}&tn=${params.tn}&tr=${params.tr}`;
        },
        "icon": <Image source={PhonePeLogo} style={style}/>
    },
    {
        "name": "Paytm",
        "generateDeeplink": function(params) {
            return `paytm://pay?am=${params.am}&cu=${params.cu}&mc=${params.mc}&pa=${params.pa}&pn=${params.pn}&tn=${params.tn}&tr=${params.tr}`;
        },
        "icon": <Image source={{uri: "https://commons.wikimedia.org/wiki/File:Paytm_Logo_(standalone).svg"}} style={style}/>
    },
    {
        "name": "Amazon Pay",
        "generateDeeplink": function(params) {
            return `amazonpay://pay?am=${params.am}&cu=${params.cu}&mc=${params.mc}&pa=${params.pa}&pn=${params.pn}&tn=${params.tn}&tr=${params.tr}`;
        },
        "icon": <Image source={{uri: "https://commons.wikimedia.org/wiki/File:Amazon_Pay_logo.svg"}} style={style}/>
    },
    {
        "name": "CRED",
        "generateDeeplink": function(params) {
            return `cred://pay?am=${params.am}&cu=${params.cu}&mc=${params.mc}&pa=${params.pa}&pn=${params.pn}&tn=${params.tn}&tr=${params.tr}`;
        },
        "icon": <Image source={{uri: "https://logotaglines.com/cred-logo-tagline/"}} style={style} />
    }
]
