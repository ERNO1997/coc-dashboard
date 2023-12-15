import type { LoggedUser } from '@/coc-api/models/login/logged-user';
import type { LoginCredentials } from '@/coc-api/models/login/login-credentials';
import { LoginCredentialsToJson } from '@/coc-api/models/login/login-credentials';
import { LoggedUserFromJson } from '@/coc-api/models/login/logged-user';

export async function login(credentials: LoginCredentials): Promise<LoggedUser | undefined> {
  const response = await fetch('https://developer.clashofclans.com/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(LoginCredentialsToJson(credentials)),
  });

  if (response.ok) {
    const json = await response.json();
    return LoggedUserFromJson(json);
  }
  return undefined;
}
