import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { FileValidator } from 'ngx-material-file-input';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-referentiel',
  templateUrl: './add-referentiel.component.html',
  styleUrls: ['./add-referentiel.component.css']
})
export class AddReferentielComponent implements OnInit {

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
  
  /**
   * In this example, it's 1 MB (=1 * 2 ** 20).
   */
  readonly maxSize = 1048576;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
      presentation: ['',{ validators: [Validators.required], updateOn: "change" }],
      program: ['',{ validators: [FileValidator.maxContentSize(this.maxSize)], updateOn: "change" }],
      critereEval: ['',{ validators: [Validators.required], updateOn: "change" }],
      critereAdmi: ['',{ validators: [Validators.required], updateOn: "change" }],
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
    if (this.competences.indexOf(event.option.viewValue)==-1) {
      this.competences.push(event.option.viewValue);
      this.cmpInput.nativeElement.value = '';
      this.cmpCtrl.setValue(null); 
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.competences.filter(cmp => cmp.toLowerCase().indexOf(filterValue) === 0);
  }
}
