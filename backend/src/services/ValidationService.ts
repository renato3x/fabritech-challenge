export default class ValidationService {
  static isEmpty(value: Object): boolean {
    return Object.keys(value).length == 0
  }
}
