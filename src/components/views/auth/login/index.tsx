"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function LoginView() {
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleVisible() {
    setVisible(!visible);
  }

  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setLoading(false);
        setError("Email or Password incorrect");
      }
    } catch (error) {
      setLoading(false);
      setError("Email or Password incorrect");
    }
  };

  return (
    <div className="font-serif bg-black bg-opacity-30 rounded-lg  shadow-lg">
      <h1 className="text-center my-2 font-bold text-[40px] text-white">
        Login
      </h1>
      {error && (
        <div className="text-red-500 text-center text-[20px] mb-4">{error}</div>
      )}
      <div className=" px-3 py-5 w-96">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="my-5">
            <p className="">Email</p>
            <Input
              label=""
              name="email"
              type="email"
              placeholder="exampel@gmail.com"
              visible={false}
              handleVisible=""
            />
          </div>
          <div className="my-5">
            <p className="">Password</p>
            <div className="">
              <Input
                label=""
                name="password"
                type="password"
                placeholder="password"
                visible={visible}
                handleVisible={handleVisible}
              />
              <div className={`p-2 cursor-pointer w-5 rounded-sm mt-1`}></div>
            </div>
          </div>
          <div className="">
            <Button type="submit" variant="bg-gray-800">
              {" "}
              {loading ? `Loading...` : `Login`}
            </Button>
            <div className="text-center text-white my-3">or</div>
            <Button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              variant="bg-gray-800"
            >
              {loading ? (
                `Loading...`
              ) : (
                <div className="">
                  <FontAwesomeIcon icon={faGoogle} />
                  oogle
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>
      <p className="text-center my-5 text-white font-light">
        Dont have an Account?
        <span className="text-white font-semibold cursor-pointer">
          <Link href={"/auth/register"}> Sign up here</Link>
        </span>
      </p>
    </div>
  );
}
