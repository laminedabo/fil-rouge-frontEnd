import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pageEvent: PageEvent;
  @Input() pageIndex = 1;
  @Input() pageSize:number;
  @Input() length:number;
  @Output() currentPage = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  pageClick(event?:PageEvent){
    this.sendCurrentPage(event);
    return event
  }

  sendCurrentPage(event:PageEvent){
    this.currentPage.emit(event);
  }

}
