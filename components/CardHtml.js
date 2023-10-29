import React from 'react';
import CARD_ICON from '../constants/cardIcon';
import CARD_COLOR from '../constants/cardColour';
import { calcHeight, calcWidth, getFontSizeByWindowWidth } from '../helper/res';

const formatCardNumber = (cardNumber) => {
    const cardNumberWithSpaces = cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    return cardNumberWithSpaces;
};

function CardHtml(item) {
    const cardHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Credit Card</title>
        <style>
            .background-img {
                border-radius: 10px;
                z-index: -1; /* Ensure the image is behind the text */
                position: absolute; /* Position the image */
                width: 300px;
                height: 200px;
            }
    
            
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 50px;
                /* Make the flex direction as column */
                flex-direction: column;
                background-color: white; /* Set background color to white */
            }
    
            .card-nickname {
                font-size: 20px;
                color: white;
                padding: 10px;
            }
    
            .card-number {
                font-size: 16px; /* Adjust the font size for the card number */
                padding: 10px;
            }
    
            .card-holder {
                font-size: 16px; /* Adjust the font size for the card holder's name */
                padding: 10px;
            }
    
            .cvv,
            .card-expiration,
            .card-type {
                font-size: 14px; /* Adjust the font size for CVV, expiration date, and card type */
            }
            td{
                color: white;
            }
        </style>
    </head>
    <body>
        <img src="https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=1800" alt="Card Background" class="background-img">
        <div class="card-nickname">${item.nickname}</div>
        <table>
            <tr>
                <td class="card-number">${formatCardNumber(item.card_number)}</td>
            </tr>
            <tr>
                <td class="card-holder">${item.name_on_card}</td>
            </tr>
            <tr>
                <td class="cvv-title">CVV</td>
                <td class="card-expiration-title">Validity</td>
            </tr>
            <tr>
                <td class="cvv">${item.cvv}</td>
                <td class="card-expiration">${item.expiry}</td>
                <td class="card-type">VISA</td>
            </tr>
        </table>
    </body>
    </html>
    
`;

    return cardHtml;
}


export default CardHtml;
