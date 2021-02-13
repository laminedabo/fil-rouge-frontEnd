import { SharePromoValService } from './../../promo/share-promo-val.service';
import { Apprenant } from './../../apprenant/Apprenants';
import { Groupe } from './../Groupe';
import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details-groupe',
  templateUrl: './details-groupe.component.html',
  styleUrls: ['./details-groupe.component.css']
})
export class DetailsGroupeComponent implements OnInit {

  constructor(private shareVal: SharePromoValService) { }


  CurrentGrp: Groupe
  @Input('groupe_principal') groupe_principal: Groupe
  apprenants: Apprenant[];
  apprCurGrps: Apprenant[];
  ngOnInit(): void {
    this.shareVal.getValue().subscribe(
      (grp: Groupe) =>{
        this.CurrentGrp = grp
        this.apprCurGrps = this.CurrentGrp.apprenants
      }
    )
    this.apprenants = this.groupe_principal.apprenants
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else {
      copyArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
