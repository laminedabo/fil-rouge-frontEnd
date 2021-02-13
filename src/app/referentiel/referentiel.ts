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

export class GroupeCompetence {
    id?: number;
    libelle: string;
    competence?: Competence[];
    
    constructor(){
        this.competence.push(new Competence())
    }
}

export class Competence {
    id?: number;
    libelle: string;
    niveau: Niveau[];
    groupecompetences?: GroupeCompetence[]
    
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