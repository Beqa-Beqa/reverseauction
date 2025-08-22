import Image from "next/image";
import BridgeFrame from "@/app/_assets/bridge-frame.svg"
import RegisterForm from "@/app/_features/auth/RegisterForm";

export default function page() {
  return (
    <div className="">
      <div className="text-center bg-bg-secondary py-15 px-6">
        <h2 className="text-2xl font-semibold px-15">The Bridge to Your Next Opportunity</h2>
        <p className="mt-5">Whether you're looking to buy smarter or sell faster, we make it easy. Get started for free in under a minute.</p>
        <Image src={BridgeFrame} alt="Bridge frame" className="mt-12 mx-auto" />
      </div>
      <div className="text-center bg-bg-primary py-15 px-6">
        <h1 className="text-2xl font-bold">
          Ventura<strong className="text-accent-primary">.</strong>
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
