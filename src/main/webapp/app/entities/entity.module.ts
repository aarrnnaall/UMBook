import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'friend',
        loadChildren: () => import('./friend/friend.module').then(m => m.UmBookFriendModule),
      },
      {
        path: 'friend_search',
        loadChildren: () => import('./friend_search/friend.module_search').then(m => m.UmBookFriendModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class UmBookEntityModule {}
