import { Apprenant } from './../apprenant/Apprenants';
export interface Groupe{
    id: number,
    nom: string,
    type: string,
    dateCreation: Date,
    apprenants: Apprenant[],
    formateurs: any[]
}