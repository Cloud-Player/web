import {Component} from '@angular/core'

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'main.template.html',
    styleUrls: ['../styles/main.css']
})
export class MainComponent{
    title = 'Tour of Heroes';
}