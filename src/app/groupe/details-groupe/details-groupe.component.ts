import { Apprenant } from './../../apprenant/Apprenants';
import { Groupe } from './../Groupe';
import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-details-groupe',
  templateUrl: './details-groupe.component.html',
  styleUrls: ['./details-groupe.component.css']
})
export class DetailsGroupeComponent implements OnInit {

  constructor() { }


  @Input('CurrentGrp') CurrentGrp: Groupe
  @Input('groupe_principal') groupe_principal: Groupe
  apprenants: Apprenant[];
  apprCurGrps: Apprenant[];
  ngOnInit(): void {
    this.apprenants = this.groupe_principal.apprenants
    this.apprCurGrps = this.CurrentGrp.apprenants
    console.log(this.CurrentGrp.apprenants)
  }

  @Input('currentGrp') currentGrp(grp: Groupe){
    console.log('ee')
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
