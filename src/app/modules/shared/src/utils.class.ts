export class Utils {
  static vendorPrefixes = ['', 'webkit', 'moz', 'ms'];

  static capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static toCamelCase(...args) {
    let camelCaseStr = '';
    let firstWord = true;
    args.forEach((arg: string, index) => {
      if (arg.length > 0 && firstWord) {
        camelCaseStr += arg;
        firstWord = false;
      } else {
        camelCaseStr += Utils.capitalize(arg);
      }
    });
    return camelCaseStr;
  }
}
