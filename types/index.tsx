import { Priority, Status } from "@prisma/client";

export interface Task {
    id: string;
    title: string;
    description?: string | null;
    status:Status
    priority: Priority
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


export enum Action {
    VIEW,
    EDIT,
    
  }
