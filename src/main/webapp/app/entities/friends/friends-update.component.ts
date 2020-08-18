import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFriends, Friends } from 'app/shared/model/friends.model';
import { FriendsService } from './friends.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-friends-update',
  templateUrl: './friends-update.component.html',
})
export class FriendsUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    user: [],
    friends: [],
  });

  constructor(
    protected friendsService: FriendsService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friends }) => {
      this.updateForm(friends);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(friends: IFriends): void {
    this.editForm.patchValue({
      id: friends.id,
      user: friends.user,
      friends: friends.friends,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const friends = this.createFromForm();
    if (friends.id !== undefined) {
      this.subscribeToSaveResponse(this.friendsService.update(friends));
    } else {
      this.subscribeToSaveResponse(this.friendsService.create(friends));
    }
  }

  private createFromForm(): IFriends {
    return {
      ...new Friends(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      friends: this.editForm.get(['friends'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFriends>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
