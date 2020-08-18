import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFriends } from 'app/shared/model/friends.model';
import { FriendsService } from './friends.service';

@Component({
  templateUrl: './friends-delete-dialog.component.html',
})
export class FriendsDeleteDialogComponent {
  friends?: IFriends;

  constructor(protected friendsService: FriendsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.friendsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('friendsListModification');
      this.activeModal.close();
    });
  }
}
