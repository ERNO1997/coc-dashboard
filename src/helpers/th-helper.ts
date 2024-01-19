import th1 from '@/assets/th1.webp';
import th2 from '@/assets/th2.webp';
import th3 from '@/assets/th3.webp';
import th4 from '@/assets/th4.webp';
import th5 from '@/assets/th5.webp';
import th6 from '@/assets/th6.webp';
import th7 from '@/assets/th7.webp';
import th8 from '@/assets/th8.webp';
import th9 from '@/assets/th9.webp';
import th10 from '@/assets/th10.webp';
import th11 from '@/assets/th11.webp';
import th12 from '@/assets/th12-5.webp';
import th13 from '@/assets/th13-5.webp';
import th14 from '@/assets/th14-5.webp';
import th15 from '@/assets/th15-5.webp';
import th16 from '@/assets/th16.webp';

export function getThList() {
  return [th1, th2, th3, th4, th5, th6, th7, th8, th9, th10, th11, th12, th13, th14, th15, th16];
}

export function getThPath(th?: string) {
  if (th === undefined || th.trim() === '') return '';
  const index = +th - 1;
  const thList = getThList();
  if (index < 0 || index >= thList.length) return '';
  return thList[index];
}
