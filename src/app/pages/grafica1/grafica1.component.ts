import { Component, Input } from '@angular/core';
import { ChartData } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  
  public labels1: string[] = [ 'Hamburguesas', 'Refresco', 'Pizzas' ];
  public data1:ChartData<'doughnut'> = {
    labels: this.labels1,
    datasets: [{  
      data: [ 40, 10, 100 ],
      backgroundColor: ['#6857E6', '#009FEE', '#F02059'] 
      }]
    }
}