import { Groupe } from './../groupe/Groupe';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Promo {
  id: number;
  titre: string;
  description: string;
  lieu: string;
  langue: string;
  refAgate: string;
  fabrique: string;
  dateDebut: Date;
  dateFinProvisoire: Date;
  referentiel: string;
  apprenants: any;
  groupes: Groupe[]
}
