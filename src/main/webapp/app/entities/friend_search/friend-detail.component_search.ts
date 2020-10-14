import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendService } from './friend.service_search';
import { HttpResponse } from '@angular/common/http';
import { AccountService } from 'app/core/auth/account.service';
import { Subscription, Observable } from 'rxjs';

import { IFriend, Friend } from 'app/shared/model/friend.model';
import { IUser, User } from 'app/core/user/user.model';

@Component({
  selector: 'jhi-friend-detail',
  templateUrl: './friend-detail.component_search.html',
})
export class FriendDetailComponent implements OnInit {
  friend: IFriend | null = null;
  friends?: IFriend[];
  userfilter?: IUser[];
  friendsuser?: IFriend[];
  somethingfriend?: IFriend;
  value: any;
  valuerep: any;
  users: IUser[] | null = null;
  actived: boolean | null = null;
  add: IUser[] | undefined;
  authSubscription?: Subscription;
  account: any;
  isSaving = false;
  nullfriend: boolean | null = null;
  constructor(private accountService: AccountService, protected friendService: FriendService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ friend }) => (this.friend = friend));
    this.activatedRoute.paramMap.subscribe(params => {
      this.value = params.get('value');
    });
    this.loadAllfriend();
    this.loadAll();
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
  loadAllfriend(): void {
    this.friendService.query().subscribe((res: HttpResponse<IFriend[]>) => (this.friends = res.body || []));
  }
  filterfriendaccount(): any {
    return this.friends?.filter(x => x.user?.login === this.account.login);
  }
  filterfriendaccountrec(user: any): any {
    return this.friends?.filter(x => x.user?.login === user.login);
  }
  filterfriendanull(): any {
    if (this.friends?.filter(x => x.user?.login === this.account.login).length === 0) {
      this.nullfriend = true;
      return true;
    } else {
      this.nullfriend = false;
      return false;
    }
  }
  filterfriendanulluser(user: IUser): any {
    if (this.friends?.filter(x => x.user?.login === user.login).length === 0) {
      this.nullfriend = true;
      return true;
    } else {
      this.nullfriend = false;
      return false;
    }
  }
  filterfriendaccountalfter(): any {
    return this.friends?.filter(x => x.friends?.filter(p => p.login === this.account.login));
  }
  filterrep(user: any): any {
    if (this.friends?.filter(x => x.user?.login === this.account.login)[0].friends?.filter(p => p.login === user.login).length === 0) {
      return true;
    } else {
      return false;
    }
  }
  filterrepval(user: any): any {
    return this.friends?.filter(x => x.user?.login === this.account.login)[0].friends?.filter(p => p.login === user.login);
  }
  filternotrec(user: IUser): any {
    this.somethingfriend = this.friends?.filter(x => x.user?.login === user.login)[0];
    return this.somethingfriend?.friends?.filter(p => p.login === this.account.login);
  }
  filterfriendaccountuser(user: any): any {
    this.userfilter = this.filterfriendaccount()[0].friends;
    return this.userfilter?.filter(x => x.login === user.login);
  }
  filterrec(user: any): any {
    return this.friends?.filter(x => x.user?.login === user.login);
  }
  loadAll(): void {
    this.friendService.users().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
  }
  trackIdentity(index: number, item: User): any {
    return item.id;
  }
  setActive(isActivated: boolean, user: IUser): void {
    this.actived = isActivated;
    this.save(user);
  }

  setnotActive(isActivated: boolean, user: IUser): void {
    this.actived = isActivated;
    this.delete(user);
  }

  setActiverec(isActivated: boolean, user: IUser): void {
    this.actived = isActivated;
    this.deleterec(user);
  }

  private createFromForm(user: IUser): IFriend {
    if (this.filterfriendaccount()[0]) {
      const olduser = this.filterfriendaccount()[0].friends;
      const addnew = [];
      let i;
      for (i = 0; i < olduser.length; i++) {
        addnew.push(olduser[i]);
      }
      addnew.push(user);
      return {
        ...new Friend(),
        id: this.filterfriendaccount()[0].id,
        user: this.account,
        friends: addnew,
      };
    } else {
      const users = [user];
      return {
        ...new Friend(),
        user: this.account,
        friends: users,
      };
    }
  }
  private deleteFromFormrec(user: IUser): IFriend {
    const olduser = this.filterrec(user)[0].friends;
    const addnew = [];
    let i;
    for (i = 0; i < olduser.length; i++) {
      if (olduser[i].login !== this.account.login) {
        addnew.push(olduser[i]);
      }
    }
    return {
      ...new Friend(),
      id: this.filterrec(user)[0].id,
      user,
      friends: addnew,
    };
  }
  private deleteFromForm(user: IUser): IFriend {
    if (this.filterfriendaccount()[0]) {
      const olduser = this.filterfriendaccount()[0].friends;
      const addnew = [];
      let i;
      for (i = 0; i < olduser.length; i++) {
        if (olduser[i].login !== user.login) {
          addnew.push(olduser[i]);
        }
      }
      return {
        ...new Friend(),
        id: this.filterfriendaccount()[0].id,
        user: this.account,
        friends: addnew,
      };
    } else {
      const users = [user];
      return {
        ...new Friend(),
        user: this.account,
        friends: users,
      };
    }
  }
  save(user: IUser): void {
    this.isSaving = true;
    const friend = this.createFromForm(user);
    if (friend.id !== undefined) {
      this.subscribeToSaveResponse(this.friendService.update(friend));
    } else {
      this.subscribeToSaveResponse(this.friendService.create(friend));
    }
  }
  delete(user: IUser): void {
    this.isSaving = true;
    const friend = this.deleteFromForm(user);
    if (friend.id !== undefined) {
      this.subscribeToSaveResponse(this.friendService.update(friend));
    }
  }
  deleterec(user: IUser): void {
    this.isSaving = true;
    const friend = this.deleteFromFormrec(user);
    if (friend.id !== undefined) {
      this.subscribeToSaveResponse(this.friendService.update(friend));
    }
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

  search(texto: any, buscar: String): boolean {
    if (texto === null) {
      return false;
    } else {
      const posM = texto.indexOf(buscar[0].toUpperCase() + buscar.slice(1, 10));
      const posMm = texto.indexOf(buscar[0].toUpperCase() + buscar.slice(1, 10).toLowerCase());

      const posm = texto.indexOf(buscar[0].toLowerCase() + buscar.slice(1, 10));
      const posmM = texto.indexOf(buscar[0].toLowerCase() + buscar.slice(1, 10).toUpperCase());

      const pos = texto.indexOf(buscar);
      const pos2 = texto.indexOf(buscar.toUpperCase());
      const pos3 = texto.indexOf(buscar.toLowerCase());

      if (pos !== -1 || pos2 !== -1 || pos3 !== -1 || posM !== -1 || posm !== -1 || posMm !== -1 || posmM !== -1) {
        return true;
      } else {
        return false;
      }
    }
  }
  previousState(): void {
    window.history.back();
  }
}
