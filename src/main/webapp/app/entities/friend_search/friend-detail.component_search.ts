import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFriend } from 'app/shared/model/friend.model';

@Component({
  selector: 'jhi-friend-detail',
  templateUrl: './friend-detail.component_search.html',
})
export class FriendDetailComponent implements OnInit {
  friend: IFriend | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friend }) => (this.friend = friend));
  }

  previousState(): void {
    window.history.back();
  }
}
