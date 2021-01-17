import { NoPreloading, PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const rutasPadre: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const RUTASPADREMODULE = RouterModule.forRoot(rutasPadre);