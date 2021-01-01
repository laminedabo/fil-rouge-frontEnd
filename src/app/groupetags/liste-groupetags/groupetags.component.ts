import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groupetags',
  templateUrl: './groupetags.component.html',
  styleUrls: ['./groupetags.component.css']
})
export class ListeGroupetagsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  groupetags: any
  link="goupetags";

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: any) => {
        this.groupetags = data.groupetags
      },
      error => {
        console.log(error)
      }
    )
  }

}
