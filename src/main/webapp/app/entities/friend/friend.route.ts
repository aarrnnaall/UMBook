import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFriend, Friend } from 'app/shared/model/friend.model';
import { FriendService } from './friend.service';
import { FriendComponent } from './friend.component';
import { FriendDetailComponent } from './friend-detail.component';
import { FriendUpdateComponent } from './friend-update.component';

@Injectable({ providedIn: 'root' })
export class FriendResolve implements Resolve<IFriend> {
  constructor(private service: FriendService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFriend> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((friend: HttpResponse<Friend>) => {
          if (friend.body) {
            return of(friend.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Friend());
  }
}

export const friendRoute: Routes = [
  {
    path: '',
    component: FriendComponent,
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Friends',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FriendDetailComponent,
    resolve: {
      friend: FriendResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Friends',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FriendUpdateComponent,
    resolve: {
      friend: FriendResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Friends',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FriendUpdateComponent,
    resolve: {
      friend: FriendResolve,
    },
    data: {
      authorities: [Authority.ADMIN],
      pageTitle: 'Friends',
    },
    canActivate: [UserRouteAccessService],
  },
];
