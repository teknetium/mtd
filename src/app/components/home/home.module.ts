import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { FileTypeDemoModule } from '../file-type-demo/file-type-demo.module';
import { NzTabsModule } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd';
import { NzProgressModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd';
import { NzAlertModule } from 'ng-zorro-antd';
import { NzToolTipModule } from 'ng-zorro-antd';
import { NzStepsModule } from 'ng-zorro-antd';
import {GettingStartedModule} from '../getting-started/getting-started.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NzTabsModule,
    NzCardModule,
    NzProgressModule,
    NzButtonModule,
    NzIconModule,
    FileTypeDemoModule,
    GettingStartedModule,
    NzAlertModule,
    NzToolTipModule,
    NzStepsModule
  ],
  exports: [
    HomeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomeModule { }
