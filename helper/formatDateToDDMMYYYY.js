function formatDateToDDMMYYYY(dateString) {
    // Parse the input string to a Date object
    let date = new Date(dateString);

    // Ensure the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Extract day, month, and year and format them
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    // Return the formatted date string
    return day + '-' + month + '-' + year;
}

export default formatDateToDDMMYYYY;