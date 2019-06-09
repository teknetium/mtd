import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS} from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IconDefinition } from '@ant-design/icons-angular';
import { ProfileModule } from './components/profile/profile.module';

import {
  LeftCircleOutline,
  UpCircleOutline,
  DownCircleOutline,
  FileExcelOutline,
  FileImageOutline,
  FileJpgOutline,
  FilePdfOutline,
  FileWordOutline,
  FileTextOutline,
  FilePptOutline,
  HomeOutline,
  RightCircleOutline,
  DollarOutline,
  UserAddOutline,
  CrownOutline,
  UserOutline,
  SolutionOutline,
  LoginOutline,
  LogoutOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  ThunderboltOutline,
  ClusterOutline,
  BookOutline,
  UsergroupAddOutline,
  FileAddOutline,
  FileDoneOutline,
  FileExclamationOutline,
  ProfileOutline,
  TeamOutline
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  LeftCircleOutline,
  HomeOutline,
  RightCircleOutline,
  DollarOutline,
  UserAddOutline,
  CrownOutline,
  UserOutline,
  SolutionOutline,
  LoginOutline,
  LogoutOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  UpCircleOutline,
  DownCircleOutline,
  FileExcelOutline,
  FileImageOutline,
  FileJpgOutline,
  FilePdfOutline,
  FileWordOutline,
  FileTextOutline,
  FilePptOutline,
  ThunderboltOutline,
  TeamOutline,
  BookOutline,
  UsergroupAddOutline,
  FileAddOutline,
  ProfileOutline,
  FileDoneOutline,
  FileExclamationOutline,
  ClusterOutline
];

import { HomeModule } from './components/home/home.module';
import { ServicesModule} from './services/services.module';
import { FileTypeDemoModule } from './components/file-type-demo/file-type-demo.module';
import { PlansModule } from './components/plans/plans.module';
import { PagenotfoundModule } from './components/pagenotfound/pagenotfound.module';
import { RolesModule } from './components/roles/roles.module';
import { CallbackModule } from './components/callback/callback.module';
import { GettingStartedModule } from './components/getting-started/getting-started.module';
import {TrainingFormModule} from './components/training-form/training-form.module';

registerLocaleData


(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ServicesModule,
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    FileTypeDemoModule,
    HomeModule,
    PlansModule,
    BrowserAnimationsModule,
    PagenotfoundModule,
    RolesModule,
    CallbackModule,
    GettingStartedModule,
    TrainingFormModule,
    ProfileModule,
    AppRoutingModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#0000ff' }, // If not provided, Ant Design's official blue would be used
    { provide: NZ_ICONS, useValue: icons }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
