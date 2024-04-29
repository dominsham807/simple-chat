import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GenderCheckbox from './GenderCheckbox'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {
    const [formInputs, setFormInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: ""    
    }) 

    const { loading, signup } = useSignup() 

    const handleRadioChange = (gender) => {
        setFormInputs({ ...formInputs, gender })
    }

    const handleSubmit = async(e) => {
        e.preventDefault() 
        await signup(formInputs)
    }
    
    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className='py-2'>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Full Name</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter full name'
                            className='w-full input input-bordered h-10' 
                            value={formInputs.fullName}
                            onChange={(e) => setFormInputs({ ...formInputs, fullName: e.target.value })}
                        />
                    </div> 
                    <div className='py-2'>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10' 
                            value={formInputs.username}
                            onChange={(e) => setFormInputs({ ...formInputs, username: e.target.value })}
                        />
                    </div> 
                    <div className='py-2'>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Email Address</span>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter email address'
                            className='w-full input input-bordered h-10' 
                            value={formInputs.email}
                            onChange={(e) => setFormInputs({ ...formInputs, email: e.target.value })}
                        />
                    </div> 
                    <div className='py-2'>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10' 
                            value={formInputs.password}
                            onChange={(e) => setFormInputs({ ...formInputs, password: e.target.value })}
                        />
                    </div>
                    <div className='py-2'>
                        <label className='label'>
                            <span className='text-base label-text text-white'>Confirm Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Confirm Password'
                            className='w-full input input-bordered h-10' 
                            value={formInputs.confirmPassword}
                            onChange={(e) => setFormInputs({ ...formInputs, confirmPassword: e.target.value })}
                        />
                    </div>

                    <GenderCheckbox onRadioChange={handleRadioChange} selectedGender={formInputs.gender} />

                    <Link to='/login' className='text-sm text-white hover:underline hover:text-blue-200 mt-2 inline-block py-1 transition-colors duration-150'>
                        Already have an account?
                    </Link>

                    <div>
                        <button className='btn btn-block btn-info mt-2 border border-slate-500' type='submit' disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp