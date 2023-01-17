import { Component, OnInit } from '@angular/core';
import { resolve } from 'chart.js/dist/helpers/helpers.options';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
      
    });

  }

  getUsuarios() {

    return new Promise(res => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => res(body.data))

    });

  }

}
