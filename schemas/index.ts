import {  Priority, Status } from '@prisma/client';
import * as z from 'zod'





export const LoginSchema =z.object({
    email: z.string().email({message:'Email is required'}),
    password:z.string().min(1,{message:'Password is requird'})
})


export const RegisterSchema =z.object({
    email: z.string().email({message:'Email is required'}),
    password:z.string().min(6,{message:'Minimum 6 characters is requird'}),
    name:z.string().min(1,{message:"User Name is required"}),
    confirmPassword:z.string().optional(),
})



export const TaskSchema = z.object({
    id: z.string().cuid().optional(),
    title: z.string().min(1,{message:"Task title is required"}),
    description: z.string().optional(),
    status:  z.nativeEnum(Status).default(Status.TODO),
    priority: z.nativeEnum(Priority).default(Priority.LOW),
    userId: z.string()
  });

  export const defaultTaskData = {
    title: '',
    description:'',
    status: Status.TODO,
    priority:Priority.LOW,
    userId: ''
  }


