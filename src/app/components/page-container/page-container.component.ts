import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {
  @Input() backgroundColor: string = '#EEEBDD';
  @Input() color: string = '#080808';

  constructor() { }

  ngOnInit(): void {
  }

}
