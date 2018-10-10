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
}