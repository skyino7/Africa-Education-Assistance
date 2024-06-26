// import React, { useState } from 'react';

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//     });

//     const [error, setError] = useState(null);

//     const { email, password } = formData;

//     const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const res = await fetch('http://localhost:5000/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(errorData.message || 'Login failed');
//             }

//             const data = await res.json();
//             console.log('Login successful:', data);
//         } catch (error) {
//             console.error('Request error:', error);
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
//                 <h1 className="text-2xl font-bold text-center">Login</h1>
//                 <form className="space-y-6" onSubmit={onSubmit}>
//                     <div className="flex flex-col space-y-1">
//                         <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email Address</label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             value={email}
//                             onChange={onChange}
//                             className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             required
//                         />
//                     </div>
//                     <div className="flex flex-col space-y-1">
//                         <label htmlFor="password" className="text-sm font-semibold text-gray-600">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             value={password}
//                             onChange={onChange}
//                             className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400">
//                         Login
//                     </button>
//                     {error && <p className="text-red-500 text-center">{error}</p>}
//                     <div className="flex flex-col space-y-1">
//                         <p>Don't have an account?
//                             <a className="px-2 py-2 hover:underline text-indigo-500 focus:outline-none" href="/">Sign up</a>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await res.json();
            if (res.ok){
                console.log('Login Successful', data);
            } else {
                console.log('Login Failed', data)
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Request error:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-600">Email Address</label>
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
                        Login
                    </button>
                    <div className="flex flex-col space-y-1">
                        <p>Don't have an account?
                            <a className="px-2 py-2 hover:underline text-indigo-500 focus:outline-none" href="/register">Sign up</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
