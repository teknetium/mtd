import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingsComponent } from './trainings.component';
import { NzTableModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    TrainingsComponent
  ],
  imports: [
    CommonModule,
    NzTableModule
  ],
  exports: [
    TrainingsComponent
  ]
})
export class TrainingsModule { }
