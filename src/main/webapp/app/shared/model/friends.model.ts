import { IUser } from 'app/core/user/user.model';

export interface IFriends {
  id?: number;
  user?: IUser;
  friends?: IUser[];
}

export class Friends implements IFriends {
  constructor(public id?: number, public user?: IUser, public friends?: IUser[]) {}
}
