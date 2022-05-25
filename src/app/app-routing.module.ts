import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/poll',
        pathMatch: 'full'
    },
    {
        path: 'poll',
        loadChildren: () => import('./modules/poll/poll.module').then(m => m.PollModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
