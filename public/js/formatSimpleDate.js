async function FormatSimlpleDate(dateStr) {
    // Split the input date string "03-10-2024" into day, month, year
    const [day, month, year] = dateStr.split('-');

    // Create a new Date object (months are zero-indexed in JavaScript)
    const date = new Date(year, month - 1, day);

    // Define options for formatting the date
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    // Use toLocaleDateString to format the date
    return date.toLocaleDateString('en-GB', options).replace(',', '');
}

export{
    FormatSimlpleDate
}