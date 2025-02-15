export const toHex = (str) => {
    return Buffer.from(str, "utf8").toString("hex");
};