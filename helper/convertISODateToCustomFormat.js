function convertISODateToCustomFormat(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = hours % 12 || 12; // Convert 24h to 12h format and treat 0 as 12
    return `${day}/${month}/${year} at ${formattedHour}:${minutes} ${ampm}`;
}

export default convertISODateToCustomFormat;