"use client";

import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";

import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "@/app/components/Inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import {useRouter} from 'next/navigation'

type Variant = "LOGIN" | "REGISTER";
const AuthForm = () => {
  const session = useSession()
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  
  useEffect(() => {
    if(session?.status === "authenticated"){
     router.push('/users')
    }
  }, [session?.status, router])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post(`/api/register`, data).then(() => signIn('credentials', data))
        .catch((error) =>
          toast.error(error?.response?.data || "Something went wrong")
        );
      setIsLoading(false);
    }
    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error(`Invalid credentials`);
            
          }
          if (callback?.ok && !callback?.error) {
            toast.success(`Logged in`);
           router.push('/users')
          }
        })
        .finally(() => setIsLoading(false));
    }
  };
  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, {redirect : false}).then(cb => {
      if(cb?.error)toast.error("Something went wrong");
      if(cb?.ok && !cb?.error) toast.success("Logged in")
    }).finally(() => {setIsLoading(false)})
  };

  return (
    <div
      className="
  sm:mx-auto
   sm:w-full
    sm:max-w-md
    mt-8
    "
    >
      <div
        className="
    bg-white
    px-4
    py-8
    sm:rounded-lg
    sm:px-10
    "
      >
        <form
          className="
          space-y-6
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === "REGISTER" ? (
            <>
              <Input
                type={"text"}
                label="Name"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
                id="name"
              />
              <Input
                type={"email"}
                label="Email Address"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
                id="email"
              />
              <Input
                type={"password"}
                label="Password"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
                id="password"
              />
            </>
          ) : (
            <>
              <Input
                type={"email"}
                label="Email Address"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
                id="email"
              />
              <Input
                type={"password"}
                label="Password"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
                id="password"
              />
            </>
          )}
          <Button disabled={isLoading} fullwidth type={"submit"}>
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div
              className="absolute 
                inset-0 
                flex
                 items-center
                "
            >
              <div
                className="
                w-full
                 border-t
                 border-gray-300"
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="
                    bg-white
                     px-2
                      text-gray-500"
              >
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex mt-6 gap-2">
            <AuthSocialButton
              onClick={() => socialAction("github")}
              icon={BsGithub}
              label="Github"
            />
            <AuthSocialButton
              onClick={() => socialAction("google")}
              icon={BsGoogle}
              label="Google"
            />
          </div>
        </div>
        <div className="flex gap-2 justify-center text-sm mt-6 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "New to Messenger?"
              : "Already have an account?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
