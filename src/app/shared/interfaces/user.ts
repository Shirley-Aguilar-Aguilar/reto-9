export interface UserLogin {
  data: {
    email: string;
    password: string;
  };
}

export interface User {
  data: {
    token: string;
    user: UserResp;
  };
}

export interface UserResp {
  id: number;
  email: string;
  name: string;
}
