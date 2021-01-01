import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-add-groupe-competence',
  templateUrl: './add-groupe-competence.component.html',
  styleUrls: ['./add-groupe-competence.component.css']
})
export class AddGroupeCompetenceComponent implements OnInit {

  registerForm: FormGroup;
  competences: string[] = ["Développer le front-end d'une application web", "Réaliser une application avec wordPress","Développer le back-end d'une application web"];
  visible = true;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  cmpCtrl = new FormControl();
  filteredcompetences: Observable<string[]>;
  competence: string[] = [''];

  @ViewChild('cmpInput') cmpInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  panelOpenState = false;
  newCmp = false;

  constructor(
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
      descriptif: ['',{ validators: [Validators.required], updateOn: "change" }],
    });

    this.filteredcompetences = this.cmpCtrl.valueChanges.pipe(
      startWith(null),
      map((cmp: string | null) => cmp ? this._filter(cmp) : this.competences.slice()));
    
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid) {
      return;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our cmp
    if ((value || '').trim()) {
      this.competences.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.cmpCtrl.setValue(null);
  }

  remove(cmp: string): void {
    const index = this.competences.indexOf(cmp);

    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.competences.push(event.option.viewValue);
    this.cmpInput.nativeElement.value = '';
    this.cmpCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.competences.filter(cmp => cmp.toLowerCase().indexOf(filterValue) === 0);
  }

  newCompetence(){
    this.panelOpenState = true;
    this.newCmp = true;
  }

  cancel(){
    this.panelOpenState = false;
    this.newCmp = false;
  }
}
