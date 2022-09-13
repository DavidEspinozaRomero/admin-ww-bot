import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidateTokenGuard implements CanActivate, CanLoad {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    return this.isValidToken();
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    return this.isValidToken();
  }

  //#region methods
  isValidToken() {
    return this.auth.validarToken().pipe(
      tap((valid) => {
        if (!valid) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
  //#endregion methods
}
