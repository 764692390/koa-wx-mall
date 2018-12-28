import request from 'request'

/**
 * 
 * @param { type: get || post, param: 参数}
 * 
 */
export const CURL = (options) => {
    return new Promise((resolve, reject) => {
        if( options.type === 'post') {
            request.post({
                url:  options.url,
                body: options.param
             },(error, response, body) => {
                 if (!error && response.statusCode == 200) {
                     resolve(body)
                 } else {
                     reject(error)
                 }
             })
        } else {
            var url = options.url + '?'
            for(var k in options.param) {
                url += (k +'=' + options.param[k] +'&')
            }
            request.get(url , (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    resolve(body)
                } else {
                    reject(error)
                }
            }) 
        }
    })
}