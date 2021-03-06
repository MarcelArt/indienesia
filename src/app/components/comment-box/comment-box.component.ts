import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  @Input() name: string;
  @Input() body: string;
  @Input() imgUrl: string;

  constructor() { }

  ngOnInit(): void {
  }

}
