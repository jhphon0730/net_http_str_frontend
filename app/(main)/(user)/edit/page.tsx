"use client"

import React from "react"
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import Loading from "@/components/Loading"
import UserEditForm from "@/components/user/user-edit-form"

import { update } from '@/store/authSlice'
import { AppDispatch, RootState } from '@/store';
import { AuthUpdateFormError, validateUpdateForm } from "@/lib/utils"

const AuthProfileEditPage = () => {
	const router = useRouter()
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, user } = useSelector((state: RootState) => state.auth);

	const [errors, setErrors] = React.useState<AuthUpdateFormError>({ isValid: true, errors: {} });

	if ( !user ) return <Loading />

  const handleSubmit = async (data: Record<string, string>) => {
		const {username, email, bio, password, confirmPassword} = data 

		if (!username || !password || !confirmPassword || !email) {
			setErrors( { isValid: false, errors: { username: 'required', email: 'required', password: 'required' } })
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: `Please ensure that all fields are filled correctly \n\n username, email, password, confirmPassword`,
			})
			return
		}

		if ( password !== confirmPassword ) {
			setErrors( { isValid: false, errors: { password: 'Passwords do not match' } })
			await Swal.fire({
				icon: 'error',
				title: 'Passwords do not match',
				text: 'Please ensure that both passwords match',
			})
			return
		}

		const isError = validateUpdateForm(username, email, password)
		if (!isError.isValid) {
			setErrors(isError)
			await Swal.fire({
				icon: 'error',
				title: 'Invalid form data',
				text: 'Please ensure that all fields are filled correctly',
			})
			return
		}

		await dispatch(update({ username, email, bio, password })).unwrap()
		.then(async () => {
			await Swal.fire({
				icon: 'success',
				title: 'Profile Updated',
				text: 'Your profile has been updated successfully',
			})
			router.push('/login')
		})
		.catch((error) => {
			console.error('update failed', error)
			Swal.fire({
				icon: 'error',
				title: 'update failed',
				text: error.message ? error.message : 'There was an error updating your profile. Please try again',
			})
		})
		return
  }

	return (
		<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] p-3">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Update Your Profile</h1>
			</div>
			<UserEditForm 
				user={user}
				errors={errors}
				onSubmit={handleSubmit} />
		</div>
	)
}

export default AuthProfileEditPage;
