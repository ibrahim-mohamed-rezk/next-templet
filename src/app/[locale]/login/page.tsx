"use client";

import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignInPage() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
      // Handle sign in logic here
    } else {
      setErrors(newErrors);
    }
  };

  const handleSocialLogin = (provider: 'Google' | 'Apple'): void => {
    console.log(`Sign in with ${provider}`);
    // Handle social login logic here
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Background Images */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          className="w-full h-full object-cover blur-[80px] opacity-70" 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1280&fit=crop" 
          alt="Background"
        />
      </div>
      <div className="absolute inset-0 m-4 sm:m-6 lg:m-10">
        <img 
          className="w-full h-full object-cover rounded-[40px] sm:rounded-[60px] lg:rounded-[100px]" 
          src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1840&h=1000&fit=crop" 
          alt="Real Estate"
        />
      </div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-start gap-12 px-8">
          <div className="flex flex-col gap-10 max-w-2xl">
            <h1 className="text-red-600 text-4xl xl:text-6xl 2xl:text-7xl font-bold leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Investment makers
            </h1>
            <p className="text-white text-base xl:text-lg leading-relaxed opacity-90">
              With us, your real estate choices are always stronger and more secure, and your opportunities for the future are greater
            </p>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="w-full max-w-md mx-auto lg:max-w-lg">
          <div className="bg-black/60 backdrop-blur-sm rounded-[20px] sm:rounded-[30px] border border-red-600 p-6 sm:p-8 lg:p-12">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 mb-8 lg:mb-14">
              <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                Sign In
              </h2>
              <p className="text-white text-sm sm:text-base text-center opacity-80">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-6 lg:gap-10">
              <div className="flex flex-col gap-4 lg:gap-8">
                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-white text-sm sm:text-base font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`w-full p-3 sm:p-4 bg-white rounded-md text-gray-900 text-sm sm:text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                      errors.email ? 'ring-2 ring-red-500' : 'focus:ring-red-600'
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="text-red-500 text-xs sm:text-sm" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-white text-sm sm:text-base font-bold">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className={`w-full p-3 sm:p-4 pr-12 bg-white rounded-md text-gray-900 text-sm sm:text-base placeholder:text-gray-500 focus:outline-none focus:ring-2 ${
                        errors.password ? 'ring-2 ring-red-500' : 'focus:ring-red-600'
                      }`}
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <span id="password-error" className="text-red-500 text-xs sm:text-sm" role="alert">
                      {errors.password}
                    </span>
                  )}
                </div>
              </div>

              {/* Remember Me & Forget Password */}
              <div className="flex justify-between items-center text-xs sm:text-base">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded border-2 border-red-600 bg-transparent checked:bg-red-600 cursor-pointer focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Remember me"
                  />
                  <span className="text-white group-hover:text-gray-200 transition-colors">Remember me</span>
                </label>
                <button 
                  type="button"
                  className="text-white hover:text-red-600 transition-colors"
                  onClick={() => console.log('Forgot password clicked')}
                >
                  Forget password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-orange-500 rounded-full text-white text-base sm:text-xl font-bold hover:from-red-700 hover:to-orange-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 px-6">
                <div className="flex-1 h-px bg-white"></div>
                <span className="text-white text-sm sm:text-base">Or</span>
                <div className="flex-1 h-px bg-white"></div>
              </div>

              {/* Social Login Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex-1 p-3 sm:p-4 bg-black rounded-full flex justify-center items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800"
                  aria-label="Sign in with Google"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white text-sm sm:text-base">Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="flex-1 p-3 sm:p-4 bg-black rounded-full flex justify-center items-center gap-3 hover:bg-gray-900 transition-colors border border-gray-800"
                  aria-label="Sign in with Apple"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span className="text-white text-sm sm:text-base">Apple</span>
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="flex justify-center items-center gap-1.5 text-sm sm:text-base">
                <span className="text-white">New here?</span>
                <button 
                  type="button"
                  className="text-red-600 font-bold hover:text-red-500 transition-colors"
                  onClick={() => console.log('Sign up clicked')}
                >
                  Sign up now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}