import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  //#region variables
  menu = [
    // { icon: '', label: '', route: '' },
    // { icon: 'bi bi-building', label: 'brand name', route: './brand' },
    { icon: 'bi bi-house-door', label: 'dashboard', route: './dashboard' },
    { icon: 'bi bi-person', label: 'customers', route: './contacts' },
    { icon: 'bi bi-chat', label: 'messages', route: './messages' },
    { icon: 'bi bi-question-circle', label: 'help', route: './help' },
    { icon: 'bi bi-chat', label: 'messages', route: './messages' },
    { icon: 'bi bi-gear', label: 'settings', route: './settings' },
    { icon: 'bi bi-box-arrow-left', label: 'log out', function: this.logout },
  ];
  colapse: boolean = true;
  //#endregion variables
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  //#region methods
  toggleMenu() {
    this.colapse = !this.colapse;
  }

  logout() {
    console.log('logout');
    this.router.navigateByUrl('/auth');
  }
  //#endregion methods
}
