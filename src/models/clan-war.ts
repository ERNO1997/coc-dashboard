import type { ClanWarStatus } from '@/models/clan-war-status';
import type ClanWarMember from '@/models/clan-war-member';

export default interface ClanWar {
  status: ClanWarStatus;
  startDate: Date;
  members: ClanWarMember[];
}
