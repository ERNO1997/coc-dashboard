import { exist } from '@/utils/fetch-utils';
import type { LoggedUserAuth } from '@/coc-api/models/login/logged-user-auth';

export interface LoggedUserDeveloper {
  id: string;
  name: string;
  game: string;
  email: string;
  tier: string;
  allowedScopes?: boolean;
  maxCidrs?: number;
  prevLoginTs: string;
  prevLoginIp: string;
  prevLoginUa: string;
}

export function LoggedUserDeveloperFromJson(json: any): LoggedUserDeveloper {
  return {
    id: exist(json, 'id') ? json['id'] : '',
    name: exist(json, 'name') ? json['name'] : '',
    game: exist(json, 'game') ? json['game'] : '',
    email: exist(json, 'email') ? json['email'] : '',
    tier: exist(json, 'tier') ? json['tier'] : '',
    allowedScopes: exist(json, 'allowedScopes') ? json['allowedScopes'] : null,
    maxCidrs: exist(json, 'maxCidrs') ? json['maxCidrs'] : null,
    prevLoginTs: exist(json, 'prevLoginTs') ? json['prevLoginTs'] : '',
    prevLoginIp: exist(json, 'prevLoginIp') ? json['prevLoginIp'] : '',
    prevLoginUa: exist(json, 'prevLoginUa') ? json['prevLoginUa'] : '',
  };
}
