import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFriends } from 'app/shared/model/friends.model';
import { FriendsService } from './friends.service';
import { FriendsDeleteDialogComponent } from './friends-delete-dialog.component';

@Component({
  selector: 'jhi-friends',
  templateUrl: './friends.component.html',
})
export class FriendsComponent implements OnInit, OnDestroy {
  friends?: IFriends[];
  eventSubscriber?: Subscription;

  constructor(protected friendsService: FriendsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.friendsService.query().subscribe((res: HttpResponse<IFriends[]>) => (this.friends = res.body || []));
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

  trackId(index: number, item: IFriends): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFriends(): void {
    this.eventSubscriber = this.eventManager.subscribe('friendsListModification', () => this.loadAll());
  }

  delete(friends: IFriends): void {
    const modalRef = this.modalService.open(FriendsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.friends = friends;
  }
}
