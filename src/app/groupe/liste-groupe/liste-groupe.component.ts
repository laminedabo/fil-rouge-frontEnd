import { SharePromoValService } from './../../promo/share-promo-val.service';
import { PromoService } from './../../Services/promo.service';
import { Groupe } from './../Groupe';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-liste-groupe',
  templateUrl: './liste-groupe.component.html',
  styleUrls: ['./liste-groupe.component.css']
})
export class ListeGroupeComponent implements OnInit {

  constructor(private promoservice: PromoService, private shareVal: SharePromoValService) { }

  @Input('groupes') groupes: Groupe[]
  @Input('idPromo') idPromo: number;
  newGrp: string = '';

  ngOnInit(): void {
    this.grpClicked(this.groupes[0])
  }

  idGrp: number
  grpClicked(grp:Groupe){
    this.idGrp = grp.id;
    this.groupActif(grp);
    this.shareVal.setValue(grp)
  }

  @Output('active_groupe') active_groupe = new EventEmitter();
  groupActif(group: Groupe){
    this.active_groupe.emit(group)
  }

  newGroupe(grp: string){
    this.promoservice.addGroupe({'action':'add', 'nom':grp}, this.idPromo).subscribe(
      (group: Groupe) => {
        const g: Groupe = {
          id:this.groupes.length+2,
          nom: this.newGrp,
          type: 'sec',
          dateCreation: new Date,
          apprenants: [],
          formateurs: []
        }
        this.groupes.push(g)
        this.grpClicked(g)
      },
      error => {
        console.log(error)
      }
    )
  }
}
