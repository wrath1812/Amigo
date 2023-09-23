import Amex from '../assets/images/cardIcon/amex.png';
import MasterCard from '../assets/images/cardIcon/masterCard.png';
import Visa from '../assets/images/cardIcon/visa.png';
import Rupay from '../assets/images/cardIcon/rupay.png';
import Discover from '../assets/images/cardIcon/discover.webp';
import JCB from '../assets/images/cardIcon/jcb.png';
import GenericIcon from '../assets/images/cardIcon/genericIcon.png';

const CARD_ICON = {
    mastercard: MasterCard,
    visa: Visa,
    'american-express': Amex,
    rupay: Rupay,
    Discover: Discover,
    'diners-club': Amex,
    jcb: JCB,
    unionpay: GenericIcon,
    maestro: GenericIcon,
    mir: GenericIcon,
    elo: GenericIcon,
    hipercard: GenericIcon,
};

export default CARD_ICON;
