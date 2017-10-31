export function serverKey(name: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    Object.defineProperty(target, name, {
      get: function () {
        return this.get(propertyKey);
      },
      set: function (value) {
        this.set(propertyKey, value);
      }
    });
  };
}
