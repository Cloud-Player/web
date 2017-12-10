import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NativeAppViewComponent} from './components/native-app-view/native-app-view';

const routes: Routes = [
  {path: 'native-app', component: NativeAppViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NativeAppRoutingModule {
}
