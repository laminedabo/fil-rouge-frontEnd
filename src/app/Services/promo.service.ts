import { Injectable } from '@angular/core';
import { AuthService } from '../parametres/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PromoService {

  constructor(private authService: AuthService) { }

  getPromos(pageIndex?: number){
    return this.authService.get('/api/admin/promos');
  }


  addPromo(promo:any){
    return this.authService.post('/api/admin/promos',promo);
  }

  updatePromo(promo:any, id:number){
    return this.authService.post('/api/admin/promos/'+id,promo);
  }

  getCount(){
    return this.authService.get('/api/admin/promos/count');
  }

  search(term:any){
    return this.authService.patch('/api/admin/promos/search',term);
  }
}
