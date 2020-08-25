import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendService } from './friend.service_search';
import { HttpResponse } from '@angular/common/http';

import { IFriend } from 'app/shared/model/friend.model';
import { IUser } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-friend-detail',
  templateUrl: './friend-detail.component_search.html',
})
export class FriendDetailComponent implements OnInit {
  friend: IFriend | null = null;
  value: any;
  users: IUser[] | null = null;
  constructor(protected friendService: FriendService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friend }) => (this.friend = friend));
    this.activatedRoute.paramMap.subscribe(params => {
      this.value = params.get('value');
    });
    this.loadAll();
  }
  loadAll(): void {
    this.friendService.users().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
  }

  previousState(): void {
    window.history.back();
  }
}
