import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  
  @Output() sidenavClose = new EventEmitter();
  @Input() isMobile: boolean;

  constructor() { }

  links = [
    { 'icon': 'folder', 'title': 'MENU.DASHBOARD', 'path': '/dashboard' },
    { 'icon': 'folder', 'title': 'MENU.ORDERS', 'path': '/order' },
    { 'icon': 'folder', 'title': 'MENU.PRODUCTS', 'path': '/products' },
    { 'icon': 'folder', 'title': 'MENU.CLIENTS', 'path': '/client' },
    { 'icon': 'folder', 'title': 'MENU.SHOP', 'path': '/shop' },
    { 'icon': 'person_pin', 'title': 'MENU.USERS', 'path': '/users' },
    { 'icon': 'folder', 'title': 'Not Found', 'path': '/not-found' }
  ];

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
