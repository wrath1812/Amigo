import Amex from '../assets/images/cardIcon/amex.png';
import DinningClub from '../assets/images/cardIcon/dinersClub.png';
import Discover from '../assets/images/cardIcon/discover.webp';
import GenericIcon from '../assets/images/cardIcon/genericIcon.png';
import JCB from '../assets/images/cardIcon/jcb.png';
import MasterCard from '../assets/images/cardIcon/masterCard.png';
import Rupay from '../assets/images/cardIcon/rupay.png';
import Visa from '../assets/images/cardIcon/visa.png';

const CARD_ICON = {
    mastercard: MasterCard,
    visa: Visa,
    'american-express': Amex,
    rupay: Rupay,
    Discover,
    'diners-club': DinningClub,
    jcb: JCB,
    unionpay: GenericIcon,
    maestro: GenericIcon,
    mir: GenericIcon,
    elo: GenericIcon,
    hipercard: GenericIcon,
};

export default CARD_ICON;
