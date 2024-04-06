'use client'

import { changePasswordValidation } from '@/libs/utils/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AnimationWrapper from '../common/AnimationWrapper';
import Input from '../common/Input';
import { BsLock } from 'react-icons/bs';
import { changeUserPassword } from '@/libs/actions/user.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';



const ChangePasswordClient = () => {
  const router = useRouter();
  const changePasswordDefaultData = { currentpassword: "", newpassword: "" };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FieldValues>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: changePasswordDefaultData,
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { currentpassword, newpassword } = data;
    try {
      await changeUserPassword({currentpassword: currentpassword, newpassword: newpassword})
      .then((response) => {
        if (response?.error) {
          toast.error(response.error)
        }

        if (response?.success) {
          toast.success(response.success)
          reset();
          router.push('/')
        }
      })
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <AnimationWrapper>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <h1 className='max-md:hidden dark:text-white'>Change Password</h1>
        <div className="py-10 w-full max-md:w-[400px]">
          <div className="w-full flex flex-col gap-2">
            <Input
              type='password' 
              id='currentpassword' 
              icon={BsLock} 
              required
              register={register}
              placeholder='Current Password'
              error={errors.currentpassword?.message as string}        
            />
            <Input
              type='password' 
              id='newpassword' 
              icon={BsLock} 
              required
              register={register}
              placeholder='New Password'
              error={errors.newpassword?.message as string}         
            />
          </div>
          <button className='btn-dark px-10 mt-5' type='submit'>Change Password</button>
        </div>
      </form>
    </AnimationWrapper>
  )
}

export default ChangePasswordClient;