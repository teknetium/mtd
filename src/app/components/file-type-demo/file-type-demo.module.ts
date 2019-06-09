import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileTypeDemoComponent } from './file-type-demo.component';
import { NzIconModule } from 'ng-zorro-antd';
import { NzToolTipModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [FileTypeDemoComponent],
  imports: [
    CommonModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports: [
    FileTypeDemoComponent
  ]
})
export class FileTypeDemoModule { }
