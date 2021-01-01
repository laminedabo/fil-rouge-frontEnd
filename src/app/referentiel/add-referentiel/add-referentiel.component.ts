import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { FileValidator } from 'ngx-material-file-input';
import { Component, OnInit } from '@angular/core';

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
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid) {
      return;
    }
  }

  remove(fruit: string): void {
    const index = this.competences.indexOf(fruit);

    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.competences.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  selected(cmpt:any): void {
    this.competences.push();

  }
}
