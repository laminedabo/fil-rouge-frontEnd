import { PromoService } from './../../Services/promo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-promo',
  templateUrl: './liste-promo.component.html',
  styleUrls: ['./liste-promo.component.css']
})
export class ListePromoComponent implements OnInit {

  constructor(private promoService: PromoService) { }

  title = "Liste des Promos"

  promos: any[];

  ngOnInit(): void {
    this.promoService.getPromos(1).subscribe(
      data => {
        this.promos = data;
      },
      error => {
        console.log(error)
      }
    )
  }

}
