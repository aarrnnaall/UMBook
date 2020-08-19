import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFriend, Friend } from 'app/shared/model/friend.model';
import { FriendService } from './friend.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-friend-update',
  templateUrl: './friend-update.component.html',
})
export class FriendUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    user: [],
    friends: [],
  });

  constructor(
    protected friendService: FriendService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friend }) => {
      this.updateForm(friend);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(friend: IFriend): void {
    this.editForm.patchValue({
      id: friend.id,
      user: friend.user,
      friends: friend.friends,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const friend = this.createFromForm();
    if (friend.id !== undefined) {
      this.subscribeToSaveResponse(this.friendService.update(friend));
    } else {
      this.subscribeToSaveResponse(this.friendService.create(friend));
    }
  }

  private createFromForm(): IFriend {
    return {
      ...new Friend(),
      id: this.editForm.get(['id'])!.value,
      user: this.editForm.get(['user'])!.value,
      friends: this.editForm.get(['friends'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFriend>>): void {
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

  getSelected(selectedVals: IUser[], option: IUser): IUser {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
