import { GroupeCompetenceService } from './../../../../Services/groupe-competence.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompetenceService } from 'src/app/Services/competence.service';
import { Competence, Niveau, GroupeCompetence } from '../../../referentiel';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA, } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SseService } from 'src/app/parametres/sse-service.service';

@Component({
  selector: 'app-details-competence',
  templateUrl: './details-competence.component.html',
  styleUrls: ['./details-competence.component.css']
})
export class DetailsCompetenceComponent implements OnInit {

  constructor(private cmpService: CompetenceService, private route: ActivatedRoute, private grpcmpService: GroupeCompetenceService, private sseService: SseService) { }

  competence: Competence;
  niveaux: Niveau[];
  grpCmp: GroupeCompetence[];
  libelle: string

  ngOnInit(): void {
    this.cmpService.getCompetence(+this.route.snapshot.params['id']).subscribe(
       (comp: Competence) =>{
        this.competence = comp
        this.libelle = comp.libelle
        this.niveaux = comp.niveau;
        this.grpCmp = comp.groupecompetences
        this.niveauClicked(comp.niveau[0])
      }
    );

    this.sseService.getServerSentEvent('http://localhost:3000/.well-known/mercure?topic=competence'+this.route.snapshot.params['id']).subscribe(
      (result: any) =>{
        const data: Competence = JSON.parse(result.data);
        this.cmpService.getCompetence(data.id).subscribe(
          (cmp:Competence) =>{
            this.competence = cmp
            this.niveaux = cmp.niveau;
            this.grpCmp = cmp.groupecompetences
          }
        )
      },
      
    )
    
    this.grpcmpService.getGroupecompetences().subscribe(
      (grp: GroupeCompetence[])=>{
        grp.forEach(
          (g1: GroupeCompetence) => this.grpCmp.forEach(
            (g2: GroupeCompetence) =>{
              if (g1.libelle!=g2.libelle) {
                this.allItems.push(g1)
              }
            }
          )
        )
        console.log(this.allItems)
        console.log(grp)
        console.log(this.grpCmp)
      }
    );

    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      map((libelle: string | null) => libelle ? this._filter(libelle) : this.allItems.filter(
        (g:any) => !this.items.includes(g)
      )));
  }

  grpAction: string;
  critereEval: string;
  idNiv: number
  niveauClicked(niveau:Niveau){
    if(niveau){
    this.idNiv = niveau.id;
    this.critereEval = this.shuffelWord(niveau.critereEvaluation);
    this.grpAction = this.shuffelWord(niveau.groupeAction)
    }
  }

  shuffelWord (word: any){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
  }

  field: string = '';
  editcmp: boolean = false;
  editgrpA: boolean = false;
  editcrtEv: boolean = false;
  update(field: string){
    this.field = field;
  }

  updateLibelle(libelle: string){
    this.editcmp=false
    this.cmpService.updateCompetence({'libelle': libelle}, +this.route.snapshot.params['id']).subscribe(
      (res: any) =>{
        // console.log(res)
      }
    )
  }

  grpRemove(id: number){
    const grp = this.grpCmp.filter(
      (g:GroupeCompetence) => g.id = id
    )
    this.cmpService.updateCompetence({'to_remove': grp}, +this.route.snapshot.params['id']).subscribe(
      (res: any) =>{
        // console.log(res)
      }
    )
  }

  grpAdd(){
    this.cmpService.updateCompetence({'to_add': this.items}, +this.route.snapshot.params['id']).subscribe(
      (res: any) =>{
        // console.log(res)
        this.items = [];
      }
    )
  }

  /**
   * Affecter à un autre groupe de compétences
   */ 
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<GroupeCompetence[]>;

  @ViewChild('itemInput') itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('matAutocomplete') matAutocomplete: MatAutocomplete;
  items: GroupeCompetence[] = [];
  allItems: GroupeCompetence[] = [];

  //competence from autocomplete
  add(event: MatChipInputEvent): void {
    const input = event.input;

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.itemCtrl.setValue(null);
  }

  remove(grp: GroupeCompetence): void {
    const index = this.items.indexOf(grp)

    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const item: GroupeCompetence = event.option.value;
    if (this.items.indexOf(item)==-1) {
      this.items.push(item);
      this.itemInput.nativeElement.value = '';
      this.itemCtrl.setValue(null); 
    }
  }

  private _filter(value: string): GroupeCompetence[] {
    const filterValue = value;

    return this.allItems.filter((item: GroupeCompetence) => this.toLowerCase(item.libelle).includes(this.toLowerCase(filterValue)));
  }

  toLowerCase(ch: string):string{
    if (ch) {
    return String(ch).toLocaleLowerCase()
    }
    return
  }

  affecter(){
    console.log(this.competence)
    this.competence.groupecompetences = [...this.competence.groupecompetences, ...this.items]
    console.log(this.competence)
  }
}
