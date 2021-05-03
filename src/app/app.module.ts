import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, LOCALE_ID, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ContainerComponent } from './shared/container/container.component';
import { FooterBarComponent } from './shared/footer-bar/footer-bar.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { SessionStorageService } from './services/storage/session-storage.service';
import localeFr from '@angular/common/locales/fr';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { UsersComponent } from './pages/users/users.component';
import { ContactBoxComponent } from './shared/contact-box/contact-box.component';
import { ContactComponent } from './pages/contact/contact.component';
import { UserComponent } from './pages/users/user/user.component';
import { ApiService } from './services/api/api.service';
import { LocalStorageService } from './services/storage/local-storage.service';
import { UtilsService } from './services/utils/utils.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { APP_CONFIG, CONFIGS } from './app.config';
import { AppInterceptor } from './core/app.interceptor';
import { ExpiredSessionDialogComponent } from './shared/expired-session-dialog/expired-session-dialog.component';
import { ErrorsService } from './services/errors/errors.service';
import { AlertsService } from './services/alerts/alerts.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

export function initializeStorage(sessionStorageService: SessionStorageService) {
  return () => sessionStorageService.initiliaze();
}

registerLocaleData(localeFr, 'fr');

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
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    UsersComponent,
    ContactBoxComponent,
    ContactComponent,
    UserComponent,
    ExpiredSessionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.pulse,
      backdropBackgroundColour: CONFIGS.LOADING.BACKGROUND,
      primaryColour: CONFIGS.LOADING.COLOR, 
      secondaryColour: CONFIGS.LOADING.COLOR,
      tertiaryColour: CONFIGS.LOADING.COLOR,
  }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  })],
  providers: [
    ApiService,
    SessionStorageService,
    LocalStorageService,
    UtilsService,
    AlertsService,
    AuthenticationService,
    { provide: APP_CONFIG, useValue: CONFIGS },
    { provide: APP_INITIALIZER, useFactory: initializeStorage, deps: [SessionStorageService], multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: ErrorsService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
