import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  //#region variables
  menu = [
    // { icon: '', label: '', route: '' },
    { icon: 'bi bi-house', label: 'dashboard', route: './dashboard' },
    { icon: 'bi bi-house', label: 'settings', route: './settings' },
  ];
  //#endregion variables
  constructor() {}

  ngOnInit(): void {}
}
