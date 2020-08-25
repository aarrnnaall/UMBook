import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFriend } from 'app/shared/model/friend.model';
import { IUser } from 'app/core/user/user.model';

type EntityResponseType = HttpResponse<IFriend>;
type EntityArrayResponseType = HttpResponse<IFriend[]>;
type EntityArrayResponseType2 = HttpResponse<IUser[]>;

@Injectable({ providedIn: 'root' })
export class FriendService {
  public resourceUrl = SERVER_API_URL + 'api/friends';
  public resourceUrl2 = SERVER_API_URL + 'api/users/all';

  constructor(protected http: HttpClient) {}

  create(friend: IFriend): Observable<EntityResponseType> {
    return this.http.post<IFriend>(this.resourceUrl, friend, { observe: 'response' });
  }

  update(friend: IFriend): Observable<EntityResponseType> {
    return this.http.put<IFriend>(this.resourceUrl, friend, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFriend>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  users(req?: any): Observable<EntityArrayResponseType2> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl2, { params: options, observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFriend[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
