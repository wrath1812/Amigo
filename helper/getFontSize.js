function getFontSize(str, maxWidth,fontSize) {
    if(!str)
    return fontSize;

    const numberOfDigits=str.length;

    if(!numberOfDigits)
    return fontSize;

    const currentWidth = numberOfDigits * fontSize; 
    
    if (currentWidth > maxWidth) {
        fontSize = maxWidth / numberOfDigits ; 
    }

    return fontSize;
}

export default getFontSize;