// export const enum RegExpAPP {
//   password = '/(?:(?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/',
//   email = '/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/',
// }

export interface registerUser {
  username: string;
  email: string;
  password: string;
}

export interface loginUser {
  email: string;
  password: string;
}

export interface authloginResponse {
  email: string;
  id: string;
  message: string;
  token: string;
  username: string;
  isEmail: boolean;
  isPaid: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isEmail: boolean;
  isPaid: boolean;
}

export const RegExpAPP = {
  password: /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
};
