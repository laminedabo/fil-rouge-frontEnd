import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips'
import {MatTableModule} from '@angular/material/table'; 
import {MatListModule} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'


const MaterialComponents = [
  CommonModule,
  MatButtonModule,
  MatSliderModule,
  MatDividerModule,
  MatIconModule,
  MatChipsModule,
  MatTableModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
