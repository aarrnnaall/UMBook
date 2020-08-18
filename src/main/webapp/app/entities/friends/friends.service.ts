import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFriends } from 'app/shared/model/friends.model';

type EntityResponseType = HttpResponse<IFriends>;
type EntityArrayResponseType = HttpResponse<IFriends[]>;

@Injectable({ providedIn: 'root' })
export class FriendsService {
  public resourceUrl = SERVER_API_URL + 'api/friends';

  constructor(protected http: HttpClient) {}

  create(friends: IFriends): Observable<EntityResponseType> {
    return this.http.post<IFriends>(this.resourceUrl, friends, { observe: 'response' });
  }

  update(friends: IFriends): Observable<EntityResponseType> {
    return this.http.put<IFriends>(this.resourceUrl, friends, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFriends>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFriends[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
