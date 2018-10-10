import captchapng from 'captchapng'

const setPngCode = async () => {
  let code = Math.floor(Math.random() * (9999 - 999 + 1) + 999); //生成随机验证码
  let p = new captchapng(80, 30, parseInt(code)); // width,height,numeric captcha
  p.color(255, 255, 255, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
  let img = p.getBase64();
  let imgbase64 = new Buffer(img, "base64");
  let data = {
    code: code,
    imgbase64: imgbase64
  };
  return data;
}


export { setPngCode }