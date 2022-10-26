import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appState } from './app.reducer';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: [':host{ height: 100% }'],
})
export class AppComponent {
/*   dato$ : Observable<any>;

  constructor(private store : Store<appState>){
    this.dato$ = store.select('mensaje');
  }

  spanishMessage() {
    this.store.dispatch({ type: 'SPANISH'})
  } */
}
