import Image from "next/image";
import TabletFrame from "@/app/_assets/login-tablet-frame.svg";
import LoginForm from "@/app/_features/auth/LoginForm";

export default function page() {
  return (
    <div className="">
      <div className="text-center bg-bg-secondary py-15 px-6">
        <h2 className="text-2xl font-semibold">Welcome Back!</h2>
        <p className="mt-5">Sign in to manage your auctions and bids.</p>
        <Image src={TabletFrame} alt="Tablet frame" className="mt-12 mx-auto" />
      </div>
      <div className="text-center bg-bg-primary py-15 px-6">
        <h1 className="text-2xl font-bold">
          Ventura<strong className="text-accent-primary">.</strong>
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
