import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ContainerComponent } from './shared/container/container.component';
import { FooterBarComponent } from './shared/footer-bar/footer-bar.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    FooterBarComponent,
    TopBarComponent,
    SideBarComponent,
    LayoutComponent,
    NotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: 'rgba(255,255,255,0.5)', 
      backdropBorderRadius: '4px',
      primaryColour: '#0fc4b2', 
      secondaryColour: '#57d6c9', 
      tertiaryColour: '#b7ede8'
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
