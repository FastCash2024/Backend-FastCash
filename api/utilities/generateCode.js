export const generateRandomCode = () => {
    const length = 6;
    
    const code = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    
    return code;
};