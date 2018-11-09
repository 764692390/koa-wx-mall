import config from '../../config'
import { adminUser } from '../../models'
import BaseServices from '../base-services'
import md5 from 'md5'

class Services extends BaseServices {
  constructor() {
    super(adminUser)
  }
}

export default Services
