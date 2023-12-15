import type { LoggedUserAuth } from '@/coc-api/models/login/logged-user-auth';
import type { LoggedUserStatus } from '@/coc-api/models/login/logged-user-status';
import type { LoggedUserDeveloper } from '@/coc-api/models/login/logged-user-developer';
import { LoggedUserStatusFromJson } from '@/coc-api/models/login/logged-user-status';
import { exist } from '@/utils/fetch-utils';
import { LoggedUserAuthFromJson } from '@/coc-api/models/login/logged-user-auth';
import { LoggedUserDeveloperFromJson } from '@/coc-api/models/login/logged-user-developer';

export interface LoggedUser {
  status: LoggedUserStatus | undefined;
  sessionExpiresInSeconds: number;
  auth: LoggedUserAuth | undefined;
  developer: LoggedUserDeveloper | undefined;
  temporaryAPIToken: string;
  swaggerUrl: string;
}

export function LoggedUserFromJson(json: any): LoggedUser {
  return {
    status: exist(json, 'status') ? LoggedUserStatusFromJson(json['status']) : undefined,
    sessionExpiresInSeconds: exist(json, 'sessionExpiresInSeconds') ? json['sessionExpiresInSeconds'] : 0,
    auth: exist(json, 'auth') ? LoggedUserAuthFromJson(json['auth']) : undefined,
    developer: exist(json, 'developer') ? LoggedUserDeveloperFromJson(json['developer']) : undefined,
    temporaryAPIToken: exist(json, 'temporaryAPIToken') ? json['temporaryAPIToken'] : '',
    swaggerUrl: exist(json, 'swaggerUrl') ? json['swaggerUrl'] : '',
  };
}

export function buildSession(user: LoggedUser): string {
  const expires = 1685551968576;
  return `s:j:{"expires":${expires},"uid":"${user.auth?.uid}","token":"${user.auth?.token}"}`;
}
