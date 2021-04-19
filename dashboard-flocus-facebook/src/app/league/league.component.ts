import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Day', 'Glasses'],
        ['Mo', 3],
        ['Tu', 5],
        ['We', 6],
        ['Th', 0],
        ['Fr', 0],
        ['Sa', 1]
    ]);
    var options = {
        title: 'Glasses poured per day',
        isStacked: true
    };
    var id = document.getElementById('stats');
    if(id == null){
      alert("cannot find stats container");
      return;
    }
    var chart = new google.visualization.BarChart(id);
    chart.draw(data, options);
  }
}
