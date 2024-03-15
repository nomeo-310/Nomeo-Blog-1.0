import * as z from 'zod';

const createUserValidation = z.object({
  fullname: z.string().trim().min(5, {message: 'Minimum of 5 characters'}),
  email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
  password: z.string().min(8, {message: 'Password must be atleast 8 characters'})
});


const loginUserValidation = z.object({
  email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
  password: z.string().min(8, {message: 'Password must be atleast 8 characters'})
});



export { createUserValidation, loginUserValidation };