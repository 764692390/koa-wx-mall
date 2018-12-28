import { UserLog } from '../../services'
import BaseController from '../base-controller'

class Controller extends BaseController {
    constructor() {
        super(UserLog)
    }
}

export default new Controller