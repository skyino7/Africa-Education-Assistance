import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    });

    const { username, firstname, lastname, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok){
                console.log('User Registered', data);
            } else {
                console.log('Registration Failed', data)
            }

        } catch (err) {
            console.error('Request Error: ', err);
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="username" className="text-sm font-semibold text-gray-600">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={onChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="firstname" className="text-sm font-semibold text-gray-600">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={firstname}
                            onChange={onChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="lastname" className="text-sm font-semibold text-gray-600">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={lastname}
                            onChange={onChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={onChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onChange}
                            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        Register
                    </button>
                    <div className='flex flex-col space-y-1'>
                        <p>Have an account already?
                            <a className="px-2 py-2 hover:underline text-indigo-500 focus:outline-none" href="/login">Log in</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default Register;
