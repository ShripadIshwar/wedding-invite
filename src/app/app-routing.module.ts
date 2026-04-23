import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InvitationEntryComponent } from './pages/invitation-entry/invitation-entry.component';

const routes: Routes = [
  { path: '', component: InvitationEntryComponent, data: { animation: 'entry' } },
  { path: 'celebration', component: HomeComponent, data: { animation: 'celebration' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
