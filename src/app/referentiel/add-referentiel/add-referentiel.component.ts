import { ReferentielService } from './../../Services/referentiel.service';
import { Competence } from './../groupe-competence/competence/competence';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import { FileValidator } from 'ngx-material-file-input';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { startWith, map } from 'rxjs/operators';
import { CompetenceService } from 'src/app/Services/competence.service';

@Component({
  selector: 'app-add-referentiel',
  templateUrl: './add-referentiel.component.html',
  styleUrls: ['./add-referentiel.component.css']
})
export class AddReferentielComponent implements OnInit {

  registerForm: FormGroup;
  competences: Competence[] = [] ;
  allCompetences: Competence[] = [] ;  visible = true;
  selectable = true;
  removable = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  cmpCtrl = new FormControl();
  filteredcompetences: Observable<Competence[]>;
  @ViewChild('cmpInput') cmpInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  
  /**
   * In this example, it's 1 MB (=1 * 2 ** 20).
   */
  readonly maxSize = 1048576;

  constructor(
    private formBuilder: FormBuilder,
    private competenceService: CompetenceService,
    private referentielService: ReferentielService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      libelle: ['',{ validators: [Validators.required], updateOn: "change" }],
      presentation: ['',{ validators: [Validators.required], updateOn: "change" }],
      programme: ['',{ validators: [FileValidator.maxContentSize(this.maxSize),Validators.required], updateOn: "change" }],
      critereEval: ['',{ validators: [Validators.required], updateOn: "change" }],
      critereAdmi: ['',{ validators: [Validators.required], updateOn: "change" }],
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
      map((libelle: string | null) => libelle ? this._filter(libelle) : this.allCompetences.slice()));
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid) {
      return;
    }
    const referentiel = this.registerForm.value;
    referentiel.programme = referentiel.programme.files[0];
    const formData = new FormData();
    formData.append("libelle", referentiel.libelle);
    formData.append("presentation", referentiel.presentation);
    formData.append("critereEvaluiation", referentiel.critereEval);
    formData.append("critereAdmission", referentiel.critereAdmi);
    formData.append("programme",referentiel.programme,referentiel.programme.name);

    const competences = JSON.stringify(this.competences);
    formData.append("competences_tab", competences);
    this.referentielService.addReferentiel(formData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
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
}
