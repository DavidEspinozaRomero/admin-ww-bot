import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  //#region variables
  menu = [
    // { icon: '', label: '', route: '' },
    // { icon: 'bi bi-building', label: 'brand name', route: './brand' },
    { icon: 'bi bi-house-door', label: 'dashboard', route: '/dashboard' },
    { icon: 'bi bi-person', label: 'contacts', route: '/contacts' },
    { icon: 'bi bi-chat', label: 'messages', route: '/messages' },
    { icon: 'bi bi-hourglass', label: 'history', route: '/history' },
    { icon: 'bi bi-gear', label: 'settings', route: '/settings' },
    { icon: 'bi bi-question-circle', label: 'help', route: '/help' },
    // { icon: 'bi bi-box-arrow-left', label: 'log out' },
  ];
  colapse: boolean = true;
  //#endregion variables
  
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }

  //#region methods


  // toggleMenu() {
  //   this.colapse = !this.colapse;
  // }

  logout() {
    console.log('logout');
    localStorage.removeItem('token')
    this.router.navigateByUrl('/auth');
  }
  //#endregion methods
}
