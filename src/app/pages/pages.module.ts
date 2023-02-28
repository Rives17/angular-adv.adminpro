import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from './../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';



@NgModule({
  declarations: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent
  ],
  exports: [
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
