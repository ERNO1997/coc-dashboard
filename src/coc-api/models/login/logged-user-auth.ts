import { exist } from '@/utils/fetch-utils';
import type { LoggedUserStatus } from '@/coc-api/models/login/logged-user-status';

export interface LoggedUserAuth {
  uid: string;
  token: string;
  ua?: string;
  ip?: string;
}

export function LoggedUserAuthFromJson(json: any): LoggedUserAuth {
  return {
    uid: exist(json, 'uid') ? json['uid'] : '',
    token: exist(json, 'token') ? json['token'] : '',
    ua: exist(json, 'ua') ? json['ua'] : null,
    ip: exist(json, 'ip') ? json['ip'] : null,
  };
}
