const ucWords = (str) => {
    if (!str) return str;
    const words = str.trim().split(/\s+/);
    const capitalizedWords = words.map((word) => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase());
    const newStr = capitalizedWords.join(' ').trim();
    return newStr;
};

const maskName = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    const maskedWords = words.map((word) => {
        const displayedLength = Math.min(Math.floor(word.length) / 2, word.length <= 5 ? 2 : 3);
        const maskedWord = word.slice(0, displayedLength)
            + '*'.repeat(word.length - displayedLength);
        return maskedWord;
    });
    return maskedWords.join(' ');
};

const maskAccountNumber = (number) => {
    if (!number) return '';
    const words = number.split(' ');
    const maskedWords = words.map((word) => {
        const displayedLength = Math.min(Math.floor(word.length / 2), word.length <= 10 ? 4 : 5);
        const lastDigitLength = word.length >= 5 ? 2 : 0;
        const maskedLength = word.length - (displayedLength + lastDigitLength);
        const maskedWord = word.slice(0, displayedLength)
            + (maskedLength > 0 ? '*'.repeat(maskedLength) : '')
            + (lastDigitLength > 0 ? word.slice(-lastDigitLength) : '');
        return maskedWord;
    });
    return maskedWords.join(' ');
};

const maskIdentityNumber = (identityNumber) => {
    if (!identityNumber) return '';
    return `${identityNumber.slice(0, 4)}****${identityNumber.slice(7, 11)}**${identityNumber.slice(14, 16)}`;
};

const snakeCaseToUpperWords = (snakeCase) => {
    if (!snakeCase) return '';
    const words = snakeCase.split('_');
    const upperWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return upperWords.join(' ');
};

const camelCaseToUpperWords = (camelCase) => {
    if (!camelCase) return '';
    const words = camelCase.split(/(?=[A-Z])/);
    const upperWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return upperWords.join(' ');
};

exports.ucWords = ucWords;
exports.maskName = maskName;
exports.maskAccountNumber = maskAccountNumber;
exports.maskIdentityNumber = maskIdentityNumber;
exports.snakeCaseToUpperWords = snakeCaseToUpperWords;
exports.camelCaseToUpperWords = camelCaseToUpperWords;

module.exports = exports;
