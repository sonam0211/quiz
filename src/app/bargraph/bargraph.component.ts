import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-bargraph',
  templateUrl: './bargraph.component.html',
  styleUrls: ['./bargraph.component.css']
})
export class BargraphComponent implements OnInit {
  BarChart=[];
  correctAns;
  wrongAns;
  constructor(private userDataService: UserDataService) { 
    
  }
  

  ngOnInit() {
    this.userDataService.castCorrect.subscribe(user=> 
      {this.correctAns = user
        console.log(this.correctAns)
        
      });

    this.userDataService.castWrong.subscribe(user=> {
      this.wrongAns = user;
      this.showGraph()
    });     
}


showGraph() {
  this.BarChart = new Chart('barChart', {
    type: 'bar',
  data: {
   labels: ['Incorrect', 'Correct'],
   datasets: [{
       label: '# of Questions',
       data: [this.wrongAns, this.correctAns],
       backgroundColor: [
           'rgba(255, 99, 132, 0.2)',
           'rgba(75, 192, 192, 0.2)'
       ],
       borderColor: [
           'rgba(255,99,132,1)',
           'rgba(75, 192, 192, 1)'
       ],
       borderWidth: 1
   }]
  }, 
  options: {
   title:{
       text:"Bar Chart",
       display:true
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   },
   events: []
  }
  });
}
  
}
