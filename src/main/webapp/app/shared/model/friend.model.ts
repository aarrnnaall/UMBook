import { IUser } from 'app/core/user/user.model';

export interface IFriend {
  id?: number;
  user?: IUser;
  friends?: IUser[];
}

export class Friend implements IFriend {
  constructor(public id?: number, public user?: IUser, public friends?: IUser[]) {}
}
