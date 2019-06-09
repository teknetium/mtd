import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzStepsModule } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd';

import { GettingStartedComponent } from './getting-started.component';
import {TrainingFormModule} from '../training-form/training-form.module';
import {FileTypeDemoModule} from '../file-type-demo/file-type-demo.module';
import {FileUploadModule} from '../file-upload/file-upload.module';

@NgModule({
  declarations: [
    GettingStartedComponent
  ],
  imports: [
    CommonModule,
    NzStepsModule,
    NzCardModule,
    TrainingFormModule,
    FileTypeDemoModule,
    FileUploadModule,
  ],
  exports: [
    GettingStartedComponent
  ]
})
export class GettingStartedModule { }
