import colors from 'colors'
import config from '../../config';

export default () => {
    return async function(ctx, next) {
        let oDate = new Date().getTime();
        ctx.state = config;
        console.log(`  <---`.green)

        await next();

        let t = new Date().getTime() - oDate;
        let url = ctx.request.header.host + ctx.request.url;
        let method = ctx.request.method;
        let status = ctx.response.status;
        if (ctx.response.status > 399) {
            console.log(`  --->${method} ${status} ${url}  ${t}ms` ['red']);
            if(ctx.response.status > 499){
                ctx.body = { 
                    'errno': "1", 
                    'errmsg': false,
                    'message':'系统开小差了500'
                }
            } else {
                ctx.body = { 
                    'errno': "1", 
                    'errmsg': false,
                    'message':'系统开小差了404' 
                }
            }
            
        } else {
            console.log(`  --->${method} ${status} ${url}  ${t}ms`.green)
        }
    }
}