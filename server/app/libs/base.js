import crypto from 'crypto'

/* MD5加密 */
const MD5 = data =>{
    return crypto.createHash("md5").update(data).digest("hex");
};

export { MD5 }