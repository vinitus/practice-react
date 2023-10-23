import { createContext } from 'react';

export type Month = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

export function dateCalc(idx: number) {
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthList[idx];
}

export interface MyDate {
  month: Month;
  day: number;
  isUpdate: boolean;
}

export interface Time {
  hour: number;
  minute: number;
  isUpdate: boolean;
}

export interface ReservationInfo {
  name: string;
  date: MyDate;
  time: Time;
  note: string;
  link: string;
}

const reservationInfo: ReservationInfo = {
  name: '',
  date: {
    month: 'May',
    day: 10,
    isUpdate: false,
  },
  time: {
    hour: 14,
    minute: 0,
    isUpdate: false,
  },
  note: '',
  link: '',
};

const reservationList: ReservationInfo[] = [];

export interface ReservationContextInterface {
  reservationInfo: ReservationInfo;
  reservationList: ReservationInfo[];
}

export const ReservationContext = createContext({
  reservationInfo,
  reservationList,
});
