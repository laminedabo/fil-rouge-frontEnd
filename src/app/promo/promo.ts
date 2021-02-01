import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class Promo {
    titre: string;
    description: string;
    lieu: string;
    langue: string;
    refAgate: string;
    fabrique: string;
    dateDebut: Date;
    dateFinProvisoire: Date;
    exelFile: File;
    avatar: File;
    referentiel: string;
    apprenants: any;
}
