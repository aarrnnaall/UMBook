import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFriend } from 'app/shared/model/friend.model';
import { FriendService } from './friend.service_search';
import { FriendDeleteDialogComponent } from './friend-delete-dialog.component_search';

@Component({
  selector: 'jhi-friend',
  templateUrl: './friend.component_search.html',
})
export class FriendComponent implements OnInit, OnDestroy {
  friends?: IFriend[];
  eventSubscriber?: Subscription;

  constructor(protected friendService: FriendService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.friendService.query().subscribe((res: HttpResponse<IFriend[]>) => (this.friends = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFriends();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFriend): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFriends(): void {
    this.eventSubscriber = this.eventManager.subscribe('friendListModification', () => this.loadAll());
  }

  delete(friend: IFriend): void {
    const modalRef = this.modalService.open(FriendDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.friend = friend;
  }
}
