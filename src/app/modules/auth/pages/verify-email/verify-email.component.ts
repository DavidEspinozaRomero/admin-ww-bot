import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  //#region
  //#endregion

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (res: any) => {
        if (!res?.token) return;
        this.verifyEmail(res.token);
      },
    });
  }

  //#region Apis
  //Post
  verifyEmail(token: string) {
    this.authService.verifyEmail({token}).subscribe({
      next: (res) => {
        console.log(res);
        
      }
    });
  }
  //#region Apis

  //#region Methods

  //#endregion Methods
}
