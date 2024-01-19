import { BASE_URL } from '@/firebase-api-db/config';
import type ClanMember from '@/models/clan-member';
import { ClanMemberRole } from '@/models/clan-member-role';
import RouteNames from '@/router/route-names';
import { da } from 'vuetify/locale';

export interface ClanMemberFirebase {
  firebaseId: string;
  data: ClanMember;
}

export const useMembersAPI = () => {
  async function getMembers() {
    try {
      const response = await fetch(BASE_URL + 'members.json');
      if (response.ok) {
        const data = await response.json();
        const result: ClanMemberFirebase[] = [];
        for (const id in data) {
          result.push({
            firebaseId: id,
            data: {
              id: data[id].id ?? '',
              name: data[id].name ?? '',
              th: data[id].th ?? 1,
              role: data[id].role ?? ClanMemberRole.UNKNOWN,
              lastTimeSeen: data[id].lastTimeSeen ?? new Date(),
              isActive: data[id].isActive ?? false,
              warStatus: data[id].warStatus ?? false,
              enteringDate: data[id].lastTimeSeen ?? new Date(),
            },
          });
        }
        return result;
      } else {
        throw new Error('Error loading members');
      }
    } catch (error) {
      throw new Error(error?.toString());
    }
  }

  async function getMember(id: string) {
    try {
      const response = await fetch(`${BASE_URL}members/${id}.json`);
      if (response.ok) {
        const data = await response.json();
        const result: ClanMember = {
          id: data.id ?? '',
          name: data.name ?? '',
          th: data.th ?? 1,
          role: data.role ?? ClanMemberRole.UNKNOWN,
          lastTimeSeen: data.lastTimeSeen ?? new Date(),
          isActive: data.isActive ?? false,
          warStatus: data.warStatus ?? false,
          enteringDate: data.enteringDate ?? new Date(),
        };
        return result;
      } else {
        throw new Error('Error loading member');
      }
    } catch (error) {
      throw new Error(error?.toString());
    }
  }

  async function addMember(member: ClanMember) {
    return fetch(BASE_URL + 'members.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
  }

  async function editMember(id: string, member: ClanMember) {
    return fetch(`${BASE_URL}members/${id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(member),
    });
  }

  return { getMembers, addMember, getMember, editMember };
};
