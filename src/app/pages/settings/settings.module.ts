import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { TabViewModule } from 'primeng/tabview';
import { ChangePasswordComponent } from './changePassword/change-password.component';
import { InputTextModule } from 'primeng/inputtext';
import { SettingsComponent } from './settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { StatisticComponent } from './statistic/statistic.component';
import { TableModule } from 'primeng/table';
import { TourLoaderComponent } from './tour-loader/tour-loader.component';

@NgModule({
  declarations: [
    ChangePasswordComponent,
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule
  ],
  providers:[MessageService]
}) 
export class SettingsModule { }
