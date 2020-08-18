import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmBookSharedModule } from 'app/shared/shared.module';
import { FriendsComponent } from './friends.component';
import { FriendsDetailComponent } from './friends-detail.component';
import { FriendsUpdateComponent } from './friends-update.component';
import { FriendsDeleteDialogComponent } from './friends-delete-dialog.component';
import { friendsRoute } from './friends.route';

@NgModule({
  imports: [UmBookSharedModule, RouterModule.forChild(friendsRoute)],
  declarations: [FriendsComponent, FriendsDetailComponent, FriendsUpdateComponent, FriendsDeleteDialogComponent],
  entryComponents: [FriendsDeleteDialogComponent],
})
export class UmBookFriendsModule {}
