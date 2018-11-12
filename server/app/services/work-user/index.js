import { workUser } from '../../models'
import BaseServices from '../base-services'


class Services extends BaseServices {
    constructor() {
        super(workUser)
    }
}

export default Services
