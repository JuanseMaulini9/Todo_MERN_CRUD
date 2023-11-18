import { Request } from "express";

interface User {
  id: string;
  iat: number;
  exp: number;
}

export interface Authrequest extends Request {
  user?: User;
}

export interface UserFound {
  _id: {
    $oid: string;
  };
  username: string;
  email: string;
  password: string;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}
