import { jobType } from '../../models'
import BaseServices from '../base-services'


class Services extends BaseServices {
  constructor() {
    super(jobType)
  }
}

export default Services
