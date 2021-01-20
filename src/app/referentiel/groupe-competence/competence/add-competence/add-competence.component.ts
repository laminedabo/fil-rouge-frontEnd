import { GroupeCompetenceService } from './../../../../Services/groupe-competence.service';
import { CompetenceService } from './../../../../Services/competence.service';
import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent implements OnInit {

  @Input() called = false;
  @Output() competenceEvent = new EventEmitter();
  action: string='';

  grpCompetences: any[] = [] ;
  allGrpCompetences: any[] = [] ;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  cmpCtrl = new FormControl();
  filteredGrpCompetences: Observable<any[]>;

  @ViewChild('cmpInput') cmpInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  registerForm: FormGroup;
  niveauxFrom: FormGroup;

  niveaux:any[] = [
    {
      "libelle":"Niveau1",
      "grpAction": "",
      "critereEval":""
    },
    {
      "libelle":"Niveau2",
      "grpAction":"",
      "critereEval":""
    },
    {
      "libelle":"Niveau3",
      "grpAction":"",
      "critereEval":""
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private competenceService: CompetenceService,
    private grpCompService: GroupeCompetenceService,
  ) { }

  ngOnInit(): void {
    this.grpCompService.getGroupecompetences().subscribe(
      data => {
        this.allGrpCompetences = data;
      },
      error => {
        console.log(error);
      }
    )

    this.filteredGrpCompetences = this.cmpCtrl.valueChanges.pipe(
      startWith(null),
      map((libelle: string | null) => libelle ? this._filter(libelle) : this.allGrpCompetences.slice()));
      
    this.action = this.called===false?"Valider":"Ajouter";
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
    });

    this.niveauxFrom = this.formBuilder.group({
      grpAction1: ['',{ validators: [Validators.required], updateOn: "change" }],
      critereEval1: ['',{ validators: [Validators.required], updateOn: "change" }],
      grpAction2: ['',{ validators: [Validators.required], updateOn: "change" }],
      critereEval2: ['',{ validators: [Validators.required], updateOn: "change" }],
      grpAction3: ['',{ validators: [Validators.required], updateOn: "change" }],
      critereEval3: ['',{ validators: [Validators.required], updateOn: "change" }],
    });
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid || this.niveauxFrom.invalid || this.allGrpCompetences.length == null) {
      return;
    }
    const cmp: any = {};
    cmp.libelle = this.registerForm.value.libelle;
    cmp.niveaux = this.niveaux;
    if (!this.called) {
      cmp.groupecompetences = this.grpCompetences;
      console.log(cmp.groupecompetences)
      this.competenceService.addCompetence(cmp).subscribe(
        result => {
          console.log(result)
        },
        error => {
          console.log(error)
        }
      )
    }
    else{
      this.sendEvent(cmp);
      // this.registerForm.reset();
      // this.niveauxFrom.reset();
    }
  }


  //Groupe competence from autocomplete
  add(event: MatChipInputEvent): void {
    const input = event.input;
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.cmpCtrl.setValue(null);
  }

  remove(grpCmp: any): void {
    const index = this.grpCompetences.indexOf(grpCmp);

    if (index >= 0) {
      this.grpCompetences.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const grpCmp: any = event.option.value;
    if (this.grpCompetences.indexOf(grpCmp)==-1) {
      this.grpCompetences.push(grpCmp);
      this.cmpInput.nativeElement.value = '';
      this.cmpCtrl.setValue(null); 
    }
  }

  private _filter(value: string): any[] {
    const filterValue = value;

    return this.allGrpCompetences.filter((grpCmp: any) => this.toLowerCase(grpCmp.libelle).includes(this.toLowerCase(filterValue)));
  }


  toLowerCase(ch: string):string{
    if (ch) {
    return String(ch).toLocaleLowerCase()
    }
    return
  }

  sendEvent(cmp:any){
    this.competenceEvent.emit(cmp);
  }

}
