import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AuthService } from '../../../auth/services/auth.service';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  //#region
  //#endregion
  //#region variables
  @ViewChild('qrcode') qrcode!: ElementRef<HTMLDivElement>;
  //#endregion variables
  public get user() {
    return this.authService.user;
  }

  constructor(
    private readonly authService: AuthService,
    private readonly mainService: MainService
  ) {}

  ngOnInit(): void {
    this.mainService.getqrimg().subscribe({
      next: (res) => {
        console.log(res);
        const svg: any = res
        this.qrcode.nativeElement.appendChild(svg)
      },
    });
  }
}
