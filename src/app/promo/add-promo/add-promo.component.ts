import { PromoService } from './../../Services/promo.service';
import { ReferentielService } from './../../Services/referentiel.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { FileValidator } from 'ngx-material-file-input';
import { Promo } from '../promo';


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
      id: null,
      'libelle':''
    }
  ]
  avatar:any;

  constructor(
    private promo: Promo,
    private promoservice: PromoService,
    private formBuilder: FormBuilder,
    private refService: ReferentielService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      titre: ['',{ validators: [Validators.required], updateOn: "change" }],
      description: ['',{ validators: [Validators.required], updateOn: "change" }],
      lieu: ['',{ validators: [Validators.required], updateOn: "change" }],
      langue: ['',{ validators: [Validators.required], updateOn: "change" }],
      refAgate: ['',{ validators: [Validators.required], updateOn: "change" }],
      fabrique: ['',{ validators: [Validators.required], updateOn: "change" }],
      dateDebut: ['',{ validators: [Validators.required], updateOn: "change" }],
      dateFinProvisoire: ['',{ validators: [Validators.required], updateOn: "change" }],
      exelFile: [
        undefined,
        [FileValidator.maxContentSize(this.maxSize)]
      ],
      csvFile: [
        undefined,
        [FileValidator.maxContentSize(this.maxSize)]
      ],
    });

    this.refService.getReferentiels().subscribe(
      data => {
        this.referentiels = data;
      },
      error => {
        console.log(error)
      }
    )

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
    this.promo = this.registerForm.value;
    this.promo.apprenants = this.apprenants;
    if (this.idRef !== null) {
      this.promo.referentiel = `/api/admin/referentiels/${this.idRef}`
    }

    // console.log(this.promo)
    const formData = new FormData();
    formData.append('promo',JSON.stringify(this.promo));
    formData.append('excelFile', this.registerForm.value.exelFile.files[0]);
    formData.append('avatar', this.avatar_promo);
    this.promoservice.addPromo(formData).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  // mails from chips
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our aprMail
    if ((value || '').trim() && this.validateEmail(value) && (this.apprenants.indexOf(value)==-1)) {
      console.log(this.apprenants.indexOf(value))
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
    if (this.apprenants.indexOf(event.option.viewValue)==-1) {
      this.apprenants.push(event.option.viewValue);
      this.aprMailInput.nativeElement.value = '';
      this.aprMailCtrl.setValue(null);
    } 
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.apprenants.filter(aprMail => aprMail.toLowerCase().indexOf(filterValue) === 0);
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


// ****************************************** DRAG   AND DROP *************************************//
  public files: NgxFileDropEntry[] = [];
  imgName: string;
  avatar_promo: File = null;
 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.avatar_promo = file;
          // console.log(this.promo.avatar)
          this.getImgBase64(file);
          this.imgName = droppedFile.relativePath;
 
          // Here you can access the real file
          // console.log(droppedFile.relativePath, file);
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event: Event){
    console.log(event);
  }
 
  public fileLeave(event: Event){
    console.log(event);
  }

  getImgBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // console.log(reader.result)
      this.avatar = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  idRef: number
  refChosen(ref:any){
    this.idRef = ref.id;
  }
}
