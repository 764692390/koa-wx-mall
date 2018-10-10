const database = 'koa';
const user = 'koa';
const pass = '123456';

const options = {
    host: '47.95.205.217',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },

    operatorsAliases: false,
};

export { database, user, pass, options };