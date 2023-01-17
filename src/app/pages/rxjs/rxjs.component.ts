import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    let i = -1

    const obs$ = new Observable( observer => {
      setInterval(() => {
        
      }, 1000)
    });
  }

}
