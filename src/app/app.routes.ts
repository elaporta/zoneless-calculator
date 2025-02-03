import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calculator',
        loadComponent: () => import('@/pages/calculator.page/calculator.page.component')
    },
    {
        path: '**',
        redirectTo: 'calculator'
    }
];
