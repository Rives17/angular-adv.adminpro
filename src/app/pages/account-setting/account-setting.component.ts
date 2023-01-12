import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: [
  ]
})
export class AccountSettingComponent implements OnInit {

  constructor( private settingsService: SettingsService ) {}
  
  ngOnInit() {  
    this.settingsService.checkCurrentTheme();
  }

  changeTheme( theme: string ) {
    this.settingsService.changeTheme( theme );
  }


}
