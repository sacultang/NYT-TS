import { differenceInDays, differenceInHours, parseISO } from "date-fns";
import { News, newInterface } from "../model";
// Functions
export const dateFunc = (pub_date: string) => {
  if (Math.abs(differenceInDays(parseISO(pub_date), new Date())) > 0) {
    return (
      Math.abs(differenceInDays(parseISO(pub_date), new Date())) +
      " 일 전에 작성 되었습니다"
    );
  } else {
    return (
      Math.abs(differenceInHours(parseISO(pub_date), new Date())) +
      " 시간 전에 작성 되었습니다"
    );
  }
};
export const checkClip = (clipped: News[], _id: string) => {
  // console.log(getClip);
  return !clipped.find((storedate: News) => storedate._id === _id);
};
