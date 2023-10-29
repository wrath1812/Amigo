import React from 'react';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

function CardHtml(item) {
    const cardHtml = `
    <html>
    <header>
    <style>
    .container {
        background-color: red;
        width: ${calcWidth(90)};
        height: ${calcHeight(50)};
    }

    .card-number {
        color: white;
    }
    </style>
    </header>
    <body>
        <div class="container">
            <div>
                ${item.nickname}
            </div>
            <div class="card-number">${item.card_number}</div>
            <div>
                <div>${item.name_on_card}</div>
            </div>
            <div>
                <div>${item.expiry}</div>
                <div>${item.cvv}</div>
            </div>
        </div>
    </body>
        </html>`;

    return cardHtml;
}


export default CardHtml;
