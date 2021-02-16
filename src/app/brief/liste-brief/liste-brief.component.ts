import { BriefService } from './../../Services/brief.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-brief',
  templateUrl: './liste-brief.component.html',
  styleUrls: ['./liste-brief.component.css']
})
export class ListeBriefComponent implements OnInit {

  constructor(private briefservice: BriefService) { }

  title = "Liste des Briefs"
  briefs: any[];
  ngOnInit(): void {
    this.briefservice.getBriefs().subscribe(
      (res: any) =>{
        this.briefs = res;
        console.log(res)
      },
      error =>{
        console.log(error)
      }
    )
  }

}
