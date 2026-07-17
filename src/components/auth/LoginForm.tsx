import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../store/authStore";
import type { LoginRequest } from "../../types/auth";

export default function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);

      toast.success("Hoş geldiniz 👋");

      navigate("/");
    } catch {
      toast.error("Kullanıcı adı veya şifre hatalı.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-center mb-2">Instagram</h1>

      <p className="text-gray-500 text-center mb-8">Hesabınıza giriş yapın</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            {...register("username", {
              required: "Kullanıcı adı gerekli",
            })}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Şifre"
            {...register("password", {
              required: "Şifre gerekli",
            })}
            className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3 transition disabled:opacity-50 flex justify-center items-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Giriş Yap"}
        </button>
      </form>

      <p className="text-center mt-8 text-gray-600">
        Hesabın yok mu?{" "}
        <Link className="text-blue-500 font-semibold" to="/register">
          Kayıt Ol
        </Link>
      </p>
    </div>
  );
}
