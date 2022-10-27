export interface UserLogin {
  data:UserData;
}

export interface UserData {
  email: string;
  password: string;
}

export interface UserDataResp {
  data: {
    token: string;
    user: UserDataResp;
  };
}

export interface UserResp {
  id: number;
  email: string;
  password: string;
}
