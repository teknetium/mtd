import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd';
import { NzToolTipModule } from 'ng-zorro-antd';


import { FileUploadComponent } from './file-upload.component';

@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports: [
    FileUploadComponent
  ]
})
export class FileUploadModule { }
