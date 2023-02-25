import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [

  ]
})
export class SharedModule { }
