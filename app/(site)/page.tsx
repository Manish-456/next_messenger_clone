import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div
      className="
     flex
     min-h-full

     justify-center
     flex-col
     py-12
     sm:px-6 
     lg:px-8
     bg-gray-100
     "
    >

      <div>
        <Image
          className="mx-auto"
          src={"/logo.png"}
          alt="logo"
          height={40}
          width={40}
        />
        <h2 className="mt-5 text-3xl text-center tracking-tight text-gray-900 font-bold">
          Sign in to your account
        </h2>
      </div>

      <AuthForm />
    </div>
  );
}
