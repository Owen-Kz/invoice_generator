function getCurrentDate() {
    // Get the current date
    var currentDate = new Date();

    // Get the day, month, and year components
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    var year = currentDate.getFullYear();

    // Format the date as DD-MM-YYYY
    var formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
}

const CurrentDate = getCurrentDate()



// Due Date 
function getCurrentDatePlus7Days() {
    // Get the current date
    var currentDate = new Date();

    // Add 7 days to the current date
    var futureDate = new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Get the day, month, and year components of the future date
    var day = futureDate.getDate();
    var month = futureDate.getMonth() + 1; // Months are zero-based, so we add 1
    var year = futureDate.getFullYear();

    // Format the future date as DD-MM-YYYY
    var formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    return formattedDate;
}

// Example usage
var futureDate = getCurrentDatePlus7Days();
// console.log(futureDate); // Output will be the current date plus 7 days in the format DD-MM-YYYY



const DueDate = getCurrentDatePlus7Days()
export {
    CurrentDate,
    DueDate
}

