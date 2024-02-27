function numberToWords(number) {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function convertHundreds(n) {
        if (n > 99) {
            return units[Math.floor(n / 100)] + ' Hundred ' + (n % 100 !== 0 ? 'and ' : '') + convertTens(n % 100);
        } else {
            return convertTens(n);
        }
    }

    function convertTens(n) {
        if (n < 10) {
            return units[n];
        } else if (n >= 11 && n <= 19) {
            return teens[n - 10];
        } else {
            return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? '-' + units[n % 10] : '');
        }
    }

    if (number === 0) {
        return 'Zero';
    }

    const chunks = [];
    while (number > 0) {
        chunks.push(number % 1000);
        number = Math.floor(number / 1000);
    }

    const words = chunks.map((chunk, index) => {
        if (chunk !== 0) {
            return convertHundreds(chunk) + (index > 0 ? ' ' + ['', 'Thousand', 'Million', 'Billion'][index] : '');
        } else {
            return '';
        }
    }).reverse().join(', ').trim();

    return words;
}


export {
    numberToWords
}