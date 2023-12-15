export interface LoginCredentials {
  email: string;
  password: string;
}

export function LoginCredentialsToJson(value: LoginCredentials) {
  return {
    email: value.email,
    password: value.password,
  };
}
