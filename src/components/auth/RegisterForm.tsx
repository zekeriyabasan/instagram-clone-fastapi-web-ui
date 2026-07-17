import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import { authService } from "../../services/auth.service";
import type { RegisterRequest } from "../../types/auth";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<
    RegisterRequest & {
      confirmPassword: string;
    }
  >();

  const onSubmit = async (
    data: RegisterRequest & { confirmPassword: string },
  ) => {
    try {
      await authService.register({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      toast.success("Kayıt başarılı 🎉");

      navigate("/login");
    } catch {
      toast.error("Kayıt başarısız.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-center mb-2">Instagram</h1>

      <p className="text-gray-500 text-center mb-8">Yeni hesap oluştur</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            placeholder="Kullanıcı Adı"
            {...register("username", {
              required: "Kullanıcı adı gerekli",
              minLength: {
                value: 3,
                message: "En az 3 karakter",
              },
            })}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email gerekli",
            })}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Şifre"
            {...register("password", {
              required: "Şifre gerekli",
              minLength: {
                value: 6,
                message: "En az 6 karakter",
              },
            })}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Şifre Tekrar"
            {...register("confirmPassword", {
              required: "Şifreyi tekrar giriniz",
              validate: (value) =>
                value === watch("password") || "Şifreler uyuşmuyor",
            })}
            className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-500 hover:bg-blue-600 transition text-white rounded-xl py-3 font-semibold flex justify-center items-center"
        >
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Kayıt Ol"}
        </button>
      </form>

      <div className="text-center mt-8">
        <span className="text-gray-600">Zaten hesabın var mı?</span>

        <Link to="/login" className="ml-2 text-blue-500 font-semibold">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
}
