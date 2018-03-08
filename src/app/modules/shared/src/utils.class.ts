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

  static createDivEl(classList: Array<string>) {
    const node = document.createElement('div');
    classList.forEach((elClass) => {
      node.classList.add(elClass);
    });
    return node;
  }

  static elementIsVisible(el: HTMLElement) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
}
