"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import { postData } from "@/libs/axios/server";
import axios, { AxiosHeaders } from "axios";

export default function LoginPage() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postData(
        "customer/login-api",
        { email, password },
        new AxiosHeaders({
          Authorization: `Bearer token`,
          "Content-Type": "multipart/form-data",
        })
      );

      await axios.post("/api/auth/login", {
        token: response.token,
        user: JSON.stringify(response.data),
        remember: true,
      });

      toast.success("Login successful");
      setEmail("");
      setPassword("");
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Login failed, please try again.");
      throw error;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-500">
          {t("LoginTitle")}
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t("Email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("Password")}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t("Password")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"></span>
            ) : (
              t("Login")
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            {t("ForgotPassword")}
          </a>
        </div>
      </div>
    </div>
  );
}
