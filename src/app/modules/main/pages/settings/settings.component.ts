import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/sevices/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  
  public get user() {
    return this.authService.user
  }
  
  constructor(private readonly authService:AuthService) { }

  ngOnInit(): void {
  }

}
