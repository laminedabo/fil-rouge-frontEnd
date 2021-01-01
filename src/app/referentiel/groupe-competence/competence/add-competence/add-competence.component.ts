import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-competence',
  templateUrl: './add-competence.component.html',
  styleUrls: ['./add-competence.component.css']
})
export class AddCompetenceComponent implements OnInit {

  @Input() called = false;
  @Input() grpCmpId = '';

  registerForm: FormGroup;
  groupecmps = [
    {
      "id":1,
      "libelle":"Developper le back-end d'une appli"
    },
    {
      "id":2,
      "libelle":"Réaliser un site web avec wordPress"
    },
    {
      "id":3,
      "libelle":"Developper le fron-end d'une appli"
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
      groupecmp_id: [this.grpCmpId,{ validators: [Validators.required], updateOn: "change" }],
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
    console.log(this.niveaux);
    if (this.registerForm.invalid) {
      return;
    }
  }

  niveaux = [
    {
      "grpAction": "",
      "critereEval":""
    },
    {
      "grpAction":"",
      "critereEval":""
    },
    {
      "grpAction":"",
      "critereEval":""
    }
  ]
}
