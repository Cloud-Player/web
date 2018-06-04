import {Observable, Subscriber} from 'rxjs';

export class EaseService {
  private static _easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  }

  private static _easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  private static _easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  private static _easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  }

  private static _easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  }

  private static _easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }

  private static _easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  }

  private static _easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  }

  private static _easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }

  private static _easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  }

  private static _easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  }

  private static _easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  }

  private static _easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  }

  private static _easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  }

  private static _easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  }

  private static _easeInExpo(t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  }

  private static _easeOutExpo(t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  }

  private static _easeInOutExpo(t, b, c, d) {
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  }

  private static _easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  }

  private static _easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  }

  private static _easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  }

  private static _easeInElastic(t, b, c, d) {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * .3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  }

  private static _easeOutElastic(t, b, c, d) {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * .3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  }

  private static _easeInOutElastic(t, b, c, d) {
    let s = 1.70158;
    let p = 0;
    let a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d / 2) === 2) {
      return b + c;
    }
    if (!p) {
      p = d * (.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) {
        return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      }
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
  }

  private static _easeInBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  }

  private static _easeOutBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  }

  private static _easeInOutBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  }

  private static _easeOutBounce(t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
    }
  }

  private static ease(startValue: number,
                      endValue: number,
                      duration: number,
                      easingFn: Function,
                      subscriber: Subscriber<number>,
                      startTime = +new Date(),
                      currentTime = +new Date()) {

    const elapsed = +new Date() - startTime;
    const min = Math.min(startValue, endValue);
    const max = Math.max(startValue, endValue);
    let newVal = easingFn(currentTime - startTime, min, max, duration);

    if (startValue > endValue) {
      newVal = startValue - newVal;
    }

    if (elapsed < duration - 100) {
      subscriber.next(newVal);
      requestAnimationFrame(() => {
        this.ease(startValue, endValue, duration, easingFn, subscriber, startTime, +new Date());
      });
    } else {
      subscriber.next(endValue);
      subscriber.complete();
    }
  }

  public static easeInQuad(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInQuad, observer);
    });
  }

  public static easeOutQuad(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutQuad, observer);
    });
  }

  public static easeInOutQuad(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutQuad, observer);
    });
  }

  public static easeInCubic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInCubic, observer);
    });
  }

  public static easeOutCubic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutCubic, observer);
    });
  }

  public static easeInOutCubic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutCubic, observer);
    });
  }

  public static easeInQuart(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInQuart, observer);
    });
  }

  public static easeOutQuart(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutQuart, observer);
    });
  }

  public static easeInOutQuart(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutQuart, observer);
    });
  }

  public static easeInQuint(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInQuint, observer);
    });
  }

  public static easeOutQuint(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutQuint, observer);
    });
  }

  public static easeInOutQuint(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutQuint, observer);
    });
  }

  public static easeInSine(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInSine, observer);
    });
  }

  public static easeOutSine(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutSine, observer);
    });
  }

  public static easeInOutSine(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutSine, observer);
    });
  }

  public static easeInExpo(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInExpo, observer);
    });
  }

  public static easeOutExpo(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutExpo, observer);
    });
  }

  public static easeInOutExpo(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutExpo, observer);
    });
  }

  public static easeInCirc(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInCirc, observer);
    });
  }

  public static easeOutCirc(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutCirc, observer);
    });
  }

  public static easeInOutCirc(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutCirc, observer);
    });
  }

  public static easeInElastic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInElastic, observer);
    });
  }

  public static easeOutElastic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutElastic, observer);
    });
  }

  public static easeInOutElastic(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutElastic, observer);
    });
  }

  public static easeInBack(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInBack, observer);
    });
  }

  public static easeOutBack(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutBack, observer);
    });
  }

  public static easeInOutBack(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeInOutBack, observer);
    });
  }

  public static easeOutBounce(startValue: number, endValue: number, duration: number): Observable<number> {
    return new Observable(observer => {
      EaseService.ease(startValue, endValue, duration, EaseService._easeOutBounce, observer);
    });
  }
}
