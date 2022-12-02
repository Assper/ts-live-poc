import { addDays, isAfter, isBefore, isSameSecond, set } from "date-fns";

export const getNow = (): Date => {
  const string = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Kiev",
  });
  return new Date(string);
};

export const getToday = (): Date =>
  set(getNow(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });

export const getTommorow = (): Date => addDays(getToday(), 1);

export const sameOrBefore = (d1: Date, d2: Date) => {
  return isSameSecond(d1, d2) || isBefore(d1, d2);
};

export const sameOrAfter = (d1: Date, d2: Date) => {
  return isSameSecond(d1, d2) || isAfter(d1, d2);
};

type IsBetweenParams = {
  date: Date;
  start: Date;
  end: Date;
};
export const isBetween = ({ date, start, end }: IsBetweenParams): boolean => {
  return sameOrAfter(date, start) && sameOrBefore(date, end);
};
