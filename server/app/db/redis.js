import Redis from 'ioredis';

const redis = new Redis({
    host : '127.0.0.1',//安装好的redis服务器地址
    port : 6379,　//端口
    prefix : 'sam:',//存诸前缀
    ttl : 7200*24*30,//过期时间
    db: 0
});

export default redis