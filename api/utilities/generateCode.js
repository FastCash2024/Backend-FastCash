export const generateRandomCode = () => {
    const length = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    
    const code = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    
    return code;
};