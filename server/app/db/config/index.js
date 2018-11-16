const database = 'wx_mall';
const user = 'root';
const pass = 'root';

const options = {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+08:00', //东八时区
    operatorsAliases: false,
};

export { database, user, pass, options };