const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export default {
    port: process.env.PORT || 5000,
    //  基本信息配置
    base: {
        version: '0.0.2',
        host: IS_PRODUCTION ? 'https://shop.jczxw.cn' : 'http://192.168.8.199:5000',
        cdn: IS_PRODUCTION ? 'https://shop.jczxw.cn' : 'http://192.168.8.199:5000',
        keywords: "Web前端开发",
        description: "LzShop, Web前端开发",
        title: "首页",
        clas: '0',
    },
}