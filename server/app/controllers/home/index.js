import { Home } from '../../services'
import BaseController from '../base-controller'

class Controller extends BaseController {
  constructor() {
    super(Home)
  }
}

export default new Controller