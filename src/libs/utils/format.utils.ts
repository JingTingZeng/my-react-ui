export default class Format {

  /**
   * 數字三位一撇格式
   *
   * @static
   * @param {string} value
   * @return {*} 
   * @memberof Format
   */
  static moneyThousands(value: string) {
    if (value === '' || value === null || value === undefined) return '';
    const [integerDigits, decimalDigits] = value.toString().split('.');
    const integerWithSeparator = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    if (decimalDigits !== null && decimalDigits !== undefined) {
      return `${integerWithSeparator}.${decimalDigits}`
    } else {
      return integerWithSeparator
    }
  }
}