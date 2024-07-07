import { Priority, Status } from "@prisma/client";

export const statusItem = [
  { value: Status.TODO, label: "Todo" },
  { value: Status.DONE, label: "Done" },
  { value: Status.IN_PROGRESS, label: "In Progress" },
];

export const priorityItem = [
    { value: Priority.LOW, label: "Low" },
    { value: Priority.MEDIUM, label: "Medium" },
    { value:Priority.HIGH, label: "High" },
  ];
