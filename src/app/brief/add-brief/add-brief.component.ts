import { GroupetagsService } from './../../Services/groupetags.service';
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
import { Promo } from 'src/app/promo/promo';
import { MatAccordion } from '@angular/material/expansion';


@Component({
  selector: 'app-add-brief',
  templateUrl: './add-brief.component.html',
  styleUrls: ['./add-brief.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class AddBriefComponent implements OnInit {

  registerForm: FormGroup;
  minDate = new Date();

  /**
     * In this example, it's 100 MB (=100 * 2 ** 20).
     */
    readonly maxSize = 104857600;

  tags: any[] = [];
  groupetags: any[];
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  aprMailCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags: any[];
  @ViewChild('aprMailInput') aprMailInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild(MatAccordion) accordion: MatAccordion;

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
    private refService: ReferentielService,
    private grptagService: GroupetagsService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      titre: ['',{ validators: [Validators.required], updateOn: "change" }],
      description: ['',{ validators: [Validators.required], updateOn: "change" }],
      contexte: ['',{ validators: [Validators.required], updateOn: "change" }],
      langue: ['',{ validators: [Validators.required], updateOn: "change" }],
      livrablesAttendus: ['',{ validators: [Validators.required], updateOn: "change" }],
      modalitesPedagogiques: ['',{ validators: [Validators.required], updateOn: "change" }],
      criteresDePerformance: ['',{ validators: [Validators.required], updateOn: "change" }],
      modalitesEvaluation: ['',{ validators: [Validators.required], updateOn: "change" }],
      ressource: [
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

    this.grptagService.getGroupetags().subscribe(
      (grptg: any[])=> {
        this.groupetags = grptg
      },
      error =>{
        console.log(error)
      }
    )
    this.filteredTags = this.aprMailCtrl.valueChanges.pipe(
      startWith(null),
      map((aprMail: string | null) => aprMail ? this._filter(aprMail) : this.tags.slice()));
  }

  get formControls(){
    return this.registerForm.controls;
  }

  submitted(){
    if (this.registerForm.invalid) {
      return;
    }
    this.promo = this.registerForm.value;
    // this.promo.tags = this.tags;
    if (this.idRef !== null) {
      this.promo.referentiel = `/api/admin/referentiels/${this.idRef}`
    }

    // console.log(this.promo)
    const formData = new FormData();
    formData.append('promo',JSON.stringify(this.promo));
    formData.append('ressource', this.registerForm.value.ressource.files[0]);
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

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.aprMailCtrl.setValue(null);
  }

  remove(aprMail: string): void {
    const index = this.tags.indexOf(aprMail);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(tag: any): void {
    console.log(tag)
    if (this.tags.indexOf(tag)==-1) {
      this.tags.push(tag);
      this.aprMailInput.nativeElement.value = '';
      this.aprMailCtrl.setValue(null);
    } 
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tags.filter(aprMail => aprMail.toLowerCase().indexOf(filterValue) === 0);
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

  gpTagActv: any = {
    libelle: ''
  }
  expand: boolean = false;
  gpTagActive(gp:any){
    this.gpTagActv = gp
    this.expand = true
  }
}
