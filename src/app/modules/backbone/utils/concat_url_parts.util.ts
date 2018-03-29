import {compact, each, toArray} from 'underscore';

export function concatUrlParts(...args: Array<string>) {
  let urlParts: any = toArray(arguments);
  const cleanedUrlParts: Array<string> = [];

  // remove empty strings
  urlParts = compact(urlParts);

  each(urlParts, function (url: string, index: number) {
    if (index === 0) {
      // remove only trailing slash
      url = url.replace(/\/$/g, '');
    } else {
      // Removing leading and trailing slash
      url = url.replace(/^\/|\/$/g, '');
    }
    cleanedUrlParts.push(url);
  });

  return cleanedUrlParts.join('/');
}
