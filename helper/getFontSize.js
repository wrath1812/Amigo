function getFontSize(str, maxWidth, fontSize) {
    if (!str || str.length === 0) {
        return fontSize;
    }

    const numberOfCharacters = str.length;

    const currentWidth = numberOfCharacters * fontSize;

    if (currentWidth > maxWidth) {
        fontSize = maxWidth / numberOfCharacters;
    }

    return fontSize;
}

export default getFontSize;
