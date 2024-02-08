function sliceText(text, length = 10) {
    if (!text || text.length == 0) return '';
    // First, trim the text to remove any leading or trailing white spaces
    text = text.trim();

    // Slice the text to the desired length and add ".." at the end
    return text.slice(0, length);
}

export default sliceText;
