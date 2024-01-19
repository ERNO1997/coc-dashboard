import type { ClanMemberRole } from '@/models/clan-member-role';

export default interface ClanMember {
  id: string;
  name: string;
  th: string;
  role: ClanMemberRole;
  lastTimeSeen: Date;
  enteringDate: Date;
  isActive: boolean;
  warStatus: boolean;
}
