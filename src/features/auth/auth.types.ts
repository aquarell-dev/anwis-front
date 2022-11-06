export interface IAuthSliceInitialState {
  user: string | null | undefined;
  token: string | null | undefined;
}

export interface ICredentials {
  user: string;
  accessToken: string;
}
