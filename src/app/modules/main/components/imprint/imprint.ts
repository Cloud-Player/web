import {Component} from '@angular/core';
import {findWhere} from 'underscore';

const packageJSON = require('../../../../../../package.json');

@Component({
  selector: 'app-imprint',
  templateUrl: './imprint.html',
  styleUrls: ['./imprint.scss']
})
export class ImprintComponent {
  public isGerman() {
    return navigator.language.match(/de/i);
  }

  public getMail(): string {
    return atob('aGVsbG9AY2xvdWQtcGxheWVyLmlv');
  }

  public getDependencies(): Array<{ name: string, version: string }> {
    const dependencies: Array<{ name: string, version: string }> = [];
    for (const key in packageJSON.dependencies) {
      if (packageJSON.dependencies.hasOwnProperty(key)) {
        let name: string = key;
        if (name.match(/@.*\/.*/)) {
          name = name.split('/')[0];
          name = name.replace('@', '');
        }
        const uppercasename = name.charAt(0).toUpperCase() + name.slice(1);
        if (!findWhere(dependencies, {name: uppercasename})) {
          dependencies.push({
            name: uppercasename,
            version: packageJSON.dependencies[key].replace('^','')
          });
        }
      }
    }
    return dependencies;
  }
}
