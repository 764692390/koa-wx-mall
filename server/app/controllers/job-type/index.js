import { jobType } from '../../services'
import BaseController from '../base-controller'

class Controller extends BaseController {
  constructor() {
    super(jobType)
  }
}

export default new Controller