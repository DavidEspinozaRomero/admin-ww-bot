import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  
  //#region Variables
  user = this.authService.user;
  //#endregion Variables
  //#region 
  //#endregion 
  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {}
}
