//  import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Joi from "joi";
// import Swal from "sweetalert2";
// import { useAuth } from "@/context/authContext";
// import { AuthLayout } from"@/layouts/AuthLayout"


// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({ email: "", password: "" });

//   const schema = Joi.object({
//     email: Joi.string().required().messages({
//       "string.empty": "Email is required",
//     }),
//     password: Joi.string().required().messages({
//       "string.empty": "Password is required",
//     }),
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const { error } = schema.validate(form, { abortEarly: false });
//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error",
//         text: error.details.map((d) => d.message).join("\n"),
//       });
//       return;
//     }

//     Swal.fire({
//       title: "Logging in...",
//       allowOutsideClick: false,
//       allowEscapeKey: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       const res = await login(form.email, form.password);

//       Swal.close();
//       Swal.fire({
//         icon: "success",
//         title: "Login successful",
//         timer: 2000,
//         showConfirmButton: false,
//       });

//       // Get redirect path if passed in query
//       const redirectPath =
//         new URLSearchParams(location.search).get("redirect") || "/";

//       navigate(redirectPath);
//     } catch (err: any) {
//       Swal.close();
//       Swal.fire({
//         icon: "error",
//         title: err.message || "Login failed",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   return (
//     <AuthLayout>
//       <h1 className="text-3xl font-extrabold text-[#13424e] mb-6">Login</h1>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block mb-1 text-sm font-semibold">Email</label>
//           <input
//             name="email"
//             type="email"
//             className="w-full border rounded-md p-2"
//             placeholder="Enter your email"
//             value={form.email}
//             onChange={handleChange}
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-semibold">Password</label>
//           <input
//             name="password"
//             type="password"
//             className="w-full border rounded-md p-2"
//             placeholder="Enter your password"
//             value={form.password}
//             onChange={handleChange}
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-[#13424e] text-white py-2 rounded-full"
//         >
//           Login
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearch, useRouter } from '@tanstack/react-router';
// import { useLogin } from '@/hooks/useAuth';
// import { useAuthStore } from '@/context/authContext';
// import Swal from 'sweetalert2';

export const UserAuthForm = () => {
  const router = useRouter();
  const navigate = useNavigate();
  const { redirect } = useSearch({ from: '/(auth)/sign-in' });

  // const user = useAuthStore((state) => state.user);
  // const clearAuth = useAuthStore((state) => state.clearAuth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  // const loginMutation = useLogin();

  // useEffect(() => {
  //   if (redirect) clearAuth();
  // }, [redirect, clearAuth]);

  // useEffect(() => {
  //   if (user) {
  //     router.navigate({ to: '/' });
  //   }
  // }, [user, router]);

  // const validate = () => {
  //   const newErrors = { email: '', password: '' };
  //   let isValid = true;

  //   if (!email) {
  //     newErrors.email = 'Email is required';
  //     isValid = false;
  //   }

  //   if (!password) {
  //     newErrors.password = 'Password is required';
  //     isValid = false;
  //   }

  //   setErrors(newErrors);
  //   return isValid;
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validate()) return;

  //   Swal.fire({
  //     title: 'جاري تسجيل الدخول الطلب',
  //     padding: '2em',
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     didOpen: () => Swal.showLoading(),
  //   });

  //   try {
  //     await loginMutation.mutateAsync({ email, password });

  //     Swal.close();
  //     await Swal.fire({
  //       icon: 'success',
  //       title: 'تم تسجيل الدخول بنجاح',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });

  //     navigate({ to: redirect || '/' });
  //   } catch (err: any) {
  //     Swal.close();
  //     Swal.fire({
  //       icon: 'error',
  //       title: err.message || 'Login failed',
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   }
  // };

  return (
    <div>
      <form className="space-y-5 dark:text-white">
       {/* onSubmit={handleSubmit}> */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13424e]"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#13424e]"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          // disabled={loginMutation.isPending}
          className="w-full rounded-full bg-[#13424e] px-6 py-3 text-lg font-semibold text-white shadow-none hover:bg-[#0f353d] disabled:opacity-50"
        >
          {/* {loginMutation.isPending ? 'Logging in...' : 'Login'} */}
          Login
        </button>
      </form>
    </div>
  );
};
