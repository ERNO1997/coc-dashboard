import type ClanWarAttack from '@/models/clan-war-attack';

export default interface ClanWarMember {
  firebaseId: string;
  name: string;
  th: string;
  position: string;
  attack1: ClanWarAttack;
  attack2: ClanWarAttack;
}
