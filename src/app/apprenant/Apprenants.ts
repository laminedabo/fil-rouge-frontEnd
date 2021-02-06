import { Profil } from '../Entity/Profil';

export interface Apprenant{
    id: number,
    nom: string,
    prenom: string,
    email: string,
    adresse: string,
    lastLogin: Date,
    username: string,
    password: string,
    avatar: File,
    profil: Profil
}