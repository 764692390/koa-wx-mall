const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default {
    port: process.env.PORT || 8080,
    //  基本信息配置
    base: {
        version: '0.0.1',
        host: 'https://lz.jczxw.cn',
        cdn: 'https://lz.jczxw.cn',
        keywords: "koa2 微信小程序",
        description: "",
        title: "koa2 微信小程序",
        clas: '0',
    },
    wx:{
        // appid secret js_code
        js_code_url: 'https://api.weixin.qq.com/sns/jscode2session?grant_type=authorization_code',
        appid: 'wx7b70adca5acc463e',
        secret: 'c8590766ee5e6737eaf0fd0d5c14cd74' 
    }
}