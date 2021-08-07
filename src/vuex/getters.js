import { isBefore, parse as parseDate } from 'date-fns'
import jwtDecode from 'jwt-decode'

export default {

  tokenIsValid: state => {
    const token = state.token
    if (!token) {
      return false;
    }
    const { exp } = jwtDecode(token)
    return isBefore(new Date(), parseDate(exp, 't', new Date()))
  }
}