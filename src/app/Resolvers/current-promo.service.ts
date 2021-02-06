import { PromoService } from './../Services/promo.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentPromoResolver implements Resolve<any> {

  constructor(private promoservice: PromoService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.promoservice.getPromos();
  }
}
