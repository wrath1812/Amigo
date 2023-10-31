const formatCardNumber = (cardNumber) => {
    const cardNumberWithSpaces = cardNumber
        .replace(/\s?/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    return cardNumberWithSpaces;
};

function CardHtml(item, imageUri) {
    const cardHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Credit Card</title>
        <style>
        .background-img {
            border-radius: 20px;
            z-index: -1; /* Ensure the image is behind the text */
            position: absolute; /* Position the image */
            width: 700px;
            height: 500px;
        }

        
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 200px;
            /* Make the flex direction as column */
            flex-direction: column;
            background-color: white; /* Set background color to white */
        }

        .card-nickname {
            font-size: 40px;
            color: white;
            padding: 20px;
        }

        .card-number {
            font-size: 32px; /* Adjust the font size for the card number */
            padding: 20px;
        }

        .card-holder {
            font-size: 32px; /* Adjust the font size for the card holder's name */
            padding: 20px;
        }

        .cvv,
        .card-expiration,
        .card-type {
            font-size: 28px; /* Adjust the font size for CVV, expiration date, and card type */
        }
        td{
            color: white;
            padding-right: 60px; 
        }
        .label{
            font-size: 20px;
        }

        table {
        border-collapse: separate;
        border-spacing: 10px; /* Adjust the spacing as needed */
    }
        </style>
    </head>
    <body>
        <img src="${imageUri}" alt="Card Background" class="background-img">
        <div class="card-nickname">${item.nickname}</div>
        <table>
            <tr>
                <td class="card-number">${formatCardNumber(
                    item.card_number,
                )}</td>
            </tr>
            <tr>
                <td class="card-holder">${item.name_on_card}</td>
            </tr>
            </table>
            <table>
            <tr class="label">
                <td class="cvv-title">CVV</td>
                <td class="card-expiration-title">Validity</td>
            </tr>
            <tr>
                <td class="cvv">${item.cvv}</td>
                <td class="card-expiration">${item.expiry}</td>
            </tr>
        </table>
    </body>
    </html>
    
`;

    return cardHtml;
}

export default CardHtml;
