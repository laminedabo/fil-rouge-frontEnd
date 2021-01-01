import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { FileValidator } from 'ngx-material-file-input';


@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AddPromoComponent implements OnInit {

  registerForm: FormGroup;
  minDate = new Date();

  /**
     * In this example, it's 100 MB (=100 * 2 ** 20).
     */
    readonly maxSize = 104857600;

  apprenants: string[] = ["exemple@mail.com", "mail@mymail.sn", "notifyme@student.com"];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  aprMailCtrl = new FormControl();
  filteredapprenants: Observable<string[]>;
  competence: string[] = [''];

  @ViewChild('aprMailInput') aprMailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  referentiels = [
    {
      id:1,
      'libelle':'Developpeur.se web/mobile'
    },
    {
      id:2,
      'libelle':'Referent digital'
    },
    {
      id:3,
      'libelle':'Data scientist'
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      titre: ['',{ validators: [Validators.required], updateOn: "change" }],
      description: ['',{ validators: [Validators.required], updateOn: "change" }],
      lieu: ['',{ validators: [Validators.required], updateOn: "change" }],
      langue: ['',{ validators: [Validators.required], updateOn: "change" }],
      refAgate: ['',{ validators: [Validators.required], updateOn: "change" }],
      fabrique: ['',{ validators: [Validators.required], updateOn: "change" }],
      dateDebut: ['',{ validators: [Validators.required], updateOn: "change" }],
      dateFin: ['',{ validators: [Validators.required], updateOn: "change" }],
      exelFile: [
        undefined,
        [FileValidator.maxContentSize(this.maxSize)]
      ],
    });

    this.filteredapprenants = this.aprMailCtrl.valueChanges.pipe(
      startWith(null),
      map((aprMail: string | null) => aprMail ? this._filter(aprMail) : this.apprenants.slice()));
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

    // Add our aprMail
    if ((value || '').trim()) {
      this.apprenants.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.aprMailCtrl.setValue(null);
  }

  remove(aprMail: string): void {
    const index = this.apprenants.indexOf(aprMail);

    if (index >= 0) {
      this.apprenants.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.apprenants.push(event.option.viewValue);
    this.aprMailInput.nativeElement.value = '';
    this.aprMailCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.apprenants.filter(aprMail => aprMail.toLowerCase().indexOf(filterValue) === 0);
  }

}
