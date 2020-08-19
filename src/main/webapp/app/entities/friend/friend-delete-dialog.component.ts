import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFriend } from 'app/shared/model/friend.model';
import { FriendService } from './friend.service';

@Component({
  templateUrl: './friend-delete-dialog.component.html',
})
export class FriendDeleteDialogComponent {
  friend?: IFriend;

  constructor(protected friendService: FriendService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.friendService.delete(id).subscribe(() => {
      this.eventManager.broadcast('friendListModification');
      this.activeModal.close();
    });
  }
}
