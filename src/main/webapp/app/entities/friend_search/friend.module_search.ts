import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UmBookSharedModule } from 'app/shared/shared.module';
import { FriendComponent } from './friend.component_search';
import { FriendDetailComponent } from './friend-detail.component_search';
import { FriendUpdateComponent } from './friend-update.component_search';
import { FriendDeleteDialogComponent } from './friend-delete-dialog.component_search';
import { friendRoute } from './friend.route_search';

@NgModule({
  imports: [UmBookSharedModule, RouterModule.forChild(friendRoute)],
  declarations: [FriendComponent, FriendDetailComponent, FriendUpdateComponent, FriendDeleteDialogComponent],
  entryComponents: [FriendDeleteDialogComponent],
})
export class UmBookFriendModule {}
