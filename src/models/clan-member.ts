import type { ClanMemberRole } from '@/models/clan-member-role';

export default interface ClanMember {
  id: string;
  name: string;
  th: number;
  role: ClanMemberRole;
  lastTimeSeen: Date;
  isActive: boolean;
}
