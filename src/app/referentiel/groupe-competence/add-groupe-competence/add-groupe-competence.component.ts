import { GroupeCompetenceService } from './../../../Services/groupe-competence.service';
import { CompetenceService } from './../../../Services/competence.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Competence } from '../competence/competence';

@Component({
  selector: 'app-add-groupe-competence',
  templateUrl: './add-groupe-competence.component.html',
  styleUrls: ['./add-groupe-competence.component.css']
})
export class AddGroupeCompetenceComponent implements OnInit {

  registerForm: FormGroup;
  competences: Competence[] = [] ;
  allCompetences: Competence[] = [] ;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  cmpCtrl = new FormControl();
  filteredcompetences: Observable<Competence[]>;

  @ViewChild('cmpInput') cmpInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  panelOpenState = false;
  newCmp = []

  constructor(
      private formBuilder: FormBuilder,
      private competenceService: CompetenceService,
      private groupeCompetenceService: GroupeCompetenceService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
      descriptif: ['',{ validators: [Validators.required], updateOn: "change" }],
    });

    this.competenceService.getCompetences().subscribe(
      (data:Competence[])=> {
        this.allCompetences = data;
      },
      error => {
        console.log(error)
      }
    )

    this.filteredcompetences = this.cmpCtrl.valueChanges.pipe(
      startWith(null),
      map((libelle: string | null) => libelle ? this._filter(libelle) : this.allCompetences.filter(
        (g:any) => !this.competences.includes(g)
      )));
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.competences);
    const grpCmptence:any = this.registerForm.value;
    grpCmptence.competence = this.competences;
    this.groupeCompetenceService.addGroupecompetence(grpCmptence).subscribe(
      result => {
        console.log(result)
        this.registerForm.reset();
        this.competences = [];
      },
      error => {
        console.log(error)
      }
    );
  }

  newCmptence(cmp:any){
    this.competences.push(cmp);
    // this.newCmp = false;
  }

  //competence from autocomplete
  add(event: MatChipInputEvent): void {
    const input = event.input;

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cmpCtrl.setValue(null);
  }

  remove(cmp: Competence): void {
    const index = this.competences.indexOf(cmp);

    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const cmp: Competence = event.option.value;
    if (this.competences.indexOf(cmp)==-1) {
      this.competences.push(cmp);
      this.cmpInput.nativeElement.value = '';
      this.cmpCtrl.setValue(null); 
    }
  }

  private _filter(value: string): Competence[] {
    const filterValue = value;

    return this.allCompetences.filter((cmp: Competence) => this.toLowerCase(cmp.libelle).includes(this.toLowerCase(filterValue)));
  }

  toLowerCase(ch: string):string{
    if (ch) {
    return String(ch).toLocaleLowerCase()
    }
    return
  }

  newCompetence(){
    this.panelOpenState = true;
    this.newCmp.push(this.newCmp.length+1);
  }

  disable = 0;
  cancel(n:any){
    this.panelOpenState = false;
    // this.newCmp = false;
    console.log(n)
    this.newCmp = this.newCmp.filter(
      (elt:any)=> n!==elt
    )
  }
}
