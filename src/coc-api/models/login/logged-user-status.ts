import { exist } from '@/utils/fetch-utils';

export interface LoggedUserStatus {
  code: number;
  message: string;
  detail: string;
}

export function LoggedUserStatusFromJson(json: any): LoggedUserStatus {
  return {
    code: exist(json, 'code') ? json['code'] : 0,
    message: exist(json, 'message') ? json['message'] : '',
    detail: exist(json, 'detail') ? json['detail'] : '',
  };
}
