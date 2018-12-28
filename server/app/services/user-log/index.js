import { UserLog } from '../../models'
import BaseServices from '../base-services'


class Services extends BaseServices {
  constructor() {
    super(UserLog)
  }
}

export default Services
