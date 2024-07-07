import { Status } from "@prisma/client";

export const getStatus = (value: Status) => {
  if (value === Status.DONE) {
    return "Done";
  }

  if (value === Status.IN_PROGRESS) {
    return "In Progress";
  }

  return "Todo";
};
