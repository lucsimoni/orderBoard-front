import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CONFIGS } from 'src/app/app.config';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  mobileQuery: MediaQueryList;
  screenWidth: number;
  mobileWidth: number = CONFIGS.MOBILE_MAX_WIDTH;
  private mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: ' + this.mobileWidth + 'px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);

    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
  }

  isPageContact():boolean {
    return this.router.url === '/contact';
  }

  /**
   * Reload d'une page en douceur
   */
  // changeGlobalInfo(info: string) {
  //   this.sessionStorageService.setGlobalInfo(info);
  //   this.info = info;
  //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //   this.router.onSameUrlNavigation = 'reload';
  //   this.router.navigate([this.router.url]);
  // }

}
