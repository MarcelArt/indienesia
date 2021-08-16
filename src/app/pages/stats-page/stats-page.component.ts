import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from '../../utils/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.css']
})
export class StatsPageComponent implements OnInit {
  viewsData = [];
  downloadsData = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getViewStats();
    
  }

  onTabChanged($event): void {
    this.getViewStats();
    this.getDownloadStats();
  }

  getViewStats(): void {
    const project_id = this.route.snapshot.params.id;
    fetch(`http://localhost:3000/stats/views/${project_id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.viewsData = [];
        for(let i = 0; i < data.length; i++) {
          let dataPoint = {
            x: new Date(data[i].view_date),
            y: data[i].views
          };
          this.viewsData.push(dataPoint);
        }
        this.renderViewsChart();
      })
  }

  getDownloadStats(): void {
    const project_id = this.route.snapshot.params.id;
    fetch(`http://localhost:3000/stats/downloads/${project_id}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        this.downloadsData = [];
        for(let i = 0; i < data.length; i++) {
          let dataPoint = {
            x: new Date(data[i].download_date),
            y: data[i].downloads
          };
          this.downloadsData.push(dataPoint);
        }
        this.renderDownloadsChart();
      })
  }

  renderViewsChart(): void {
    let viewsChart = new CanvasJS.Chart("viewsChart", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Project Viewed"
      },
      axisX:{
        valueFormatString: "DD MMM",
        includeZero: true,
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Number of Visits",
        includeZero: true,
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },  
      legend:{
        cursor:"pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Total Visit",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: this.viewsData
      }]
    });
    viewsChart.render();
  }

  renderDownloadsChart(): void {
    let downloadsChart = new CanvasJS.Chart("downloadsChart", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Project Downloaded"
      },
      axisX:{
        valueFormatString: "DD MMM",
        includeZero: true,
        crosshair: {
          enabled: true,
          snapToDataPoint: true
        }
      },
      axisY: {
        title: "Number of Visits",
        includeZero: true,
        crosshair: {
          enabled: true
        }
      },
      toolTip:{
        shared:true
      },  
      legend:{
        cursor:"pointer",
        verticalAlign: "bottom",
        horizontalAlign: "left",
        dockInsidePlotArea: true
      },
      data: [{
        type: "line",
        showInLegend: true,
        name: "Total Download",
        markerType: "square",
        xValueFormatString: "DD MMM, YYYY",
        color: "#F08080",
        dataPoints: this.downloadsData
      }]
    });
    downloadsChart.render();
    
    console.log('download rendered');

  }
}
