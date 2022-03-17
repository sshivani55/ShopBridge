import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ModifyItemComponent } from './modify-item/modify-item.component';

const routes: Routes = [
  { path: 'item-list', component: ItemListComponent},
  { path: 'item-details', component: ItemDetailsComponent},
  { path: 'modify-item', component: ModifyItemComponent},
  { path: 'error-page', component: ItemListComponent},
  { path: '', component: ItemListComponent},
  // { path: '**', redirectTo: '/error-page'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
 }
