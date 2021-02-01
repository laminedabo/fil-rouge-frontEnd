export class Referentiel {
    id?: number;
    libelle: string;
    programme: File;
    presentation: string;
    critereAdmission: string;
    critereEvaluation: string;
    competences: Competence[];
    
    constructor() {
        this.competences.push(new Competence())
    }
}

export class Competence {
    id?: number;
    libelle: string;
    niveau: Niveau[];
    
    constructor(){
        this.niveau.push(new Niveau())
    }
}

export class Niveau {
    id?: number;
    "libelle":string;
    "groupeAction": string;
    "critereEvaluation": string
}