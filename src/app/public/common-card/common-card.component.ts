import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-card',
  templateUrl: './common-card.component.html',
  styleUrls: ['./common-card.component.css']
})
export class CommonCardComponent implements OnInit {

  constructor() { }

  @Input() item: any;
  @Input() link: any;

  ngOnInit(): void {
  }

}
