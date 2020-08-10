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
    { 'icon': 'folder', 'title': 'lien1', 'path': '/not-found' },
    { 'icon': 'folder', 'title': 'lien2', 'path': '/not-found' },
    { 'icon': 'folder', 'title': 'lien3', 'path': '/not-found' },
    { 'icon': 'folder', 'title': 'lien4', 'path': '/not-found' },
    { 'icon': 'folder', 'title': 'lien5', 'path': '/not-found' },
    { 'icon': 'folder', 'title': 'login', 'path': '/login' }
  ];

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
