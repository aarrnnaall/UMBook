import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmBookSharedModule } from 'app/shared/shared.module';
import { FriendComponent } from './friend.component';
import { FriendDetailComponent } from './friend-detail.component';
import { FriendUpdateComponent } from './friend-update.component';
import { FriendDeleteDialogComponent } from './friend-delete-dialog.component';
import { friendRoute } from './friend.route';

@NgModule({
  imports: [UmBookSharedModule, RouterModule.forChild(friendRoute)],
  declarations: [FriendComponent, FriendDetailComponent, FriendUpdateComponent, FriendDeleteDialogComponent],
  entryComponents: [FriendDeleteDialogComponent],
})
export class UmBookFriendModule {}
