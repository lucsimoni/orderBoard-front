import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { ContainerComponent } from './shared/container/container.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, children: [{
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '',
      // canActivate: [AuthenticationGuard],
      component: ContainerComponent, children: [
        {pathMatch: 'full', path: '', redirectTo: 'dashboard'},
        { path: 'dashboard', component: DashboardComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'users', component: UsersComponent },
        { path: 'not-found', component: NotFoundComponent },
      ]
    }]
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
