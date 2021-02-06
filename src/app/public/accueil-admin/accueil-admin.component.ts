import { Groupe } from './../../groupe/Groupe';
import { Promo } from './../../promo/promo';
import { PromoService } from './../../Services/promo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-admin',
  templateUrl: './accueil-admin.component.html',
  styleUrls: ['./accueil-admin.component.css']
})
export class AccueilAdminComponent implements OnInit {

  constructor(private route: ActivatedRoute, private promoService: PromoService) { }

  promo: Promo;
  groupe_principal: Groupe;
  groupes: Groupe[];
  id_promo: number;
  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.id_promo = data.currentPromo[data.currentPromo.length-1].id
      },
      error => {
        console.log(error)
      }
    );

    this.promoService.getPromo(Number(this.id_promo)).subscribe(
      (data_promo: Promo) => {
        this.promo = data_promo
        const principal: Groupe[] = this.promo.groupes.filter(
          (group: Groupe )=>{
            return group.type == 'principal'
          }
        )
        this.groupe_principal = principal[0];
      },
      error => {
        console.log(error)
      }
    );
  }

  active_groupe: Groupe
  groupActif(event: Groupe){
    // console.log(event)
    this.active_groupe = event
  }
}
