'use client'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router"
import { FormEvent, useState } from "react";

export default function RegisterView (){

    const [visible, setVisible] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    function handleVisible(){
        setVisible(!visible)
    }

    const {push} = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)
        setError('')
        const form = event.target as HTMLFormElement
        const data ={
            email: form.email.value,
            fullname: form.fullname.value,
            phone: form.phone.value,
            password: form.password.value,
        }

        const result = await fetch('/api/user/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if(result.status === 200){
            form.reset();
            setLoading(false);
            push('/auth/login')
            
        }
        else{
            setLoading(false)
            setError('Email is Already registered')
        }
    }

    return (
      <div className="font-serif bg-gray-900 bg-opacity-30 rounded-lg  shadow-lg ">
        <h1 className="text-center my-2 font-bold text-[40px] text-white">
          Register
        </h1>
        {error && (
          <div className="text-red-500 text-center text-[20px] mb-4">
            {error}
          </div>
        )}
        <div className=" px-3 py-5 w-96 text-[#a97231]">
          <form action="" className="" onSubmit={handleSubmit}>
            <div className="my-5">
              <p className="">Email</p>
              <label htmlFor="email" className=""></label>
              <input
                name="email"
                id="email"
                type="email"
                className="w-full rounded-lg border border-gray-100 bg-gray-100 px-1 py-1 focus:outline-none"
              />
            </div>
            <div className="my-5">
              <p className="">Fullname</p>
              <label htmlFor="fullname" className=""></label>
              <input
                name="fullname"
                id="fullname"
                type="text"
                className="w-full rounded-lg border border-gray-100 bg-gray-100 px-1 py-1 focus:outline-none"
              />
            </div>
            <div className="my-5">
              <p className="">Phone</p>
              <label htmlFor="phone" className=""></label>
              <input
                name="phone"
                id="phone"
                type="text"
                className="w-full rounded-lg border border-gray-100 bg-gray-100 px-1 py-1 focus:outline-none"
              />
            </div>
            <div className="my-5">
              <p className="">Password</p>
              <div className="">
                <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                  <label htmlFor="password" className=""></label>
                  <input
                    name="password"
                    id="password"
                    type={`${visible ? `password` : `text`}`}
                    className="w-full  bg-gray-100 p-1 focus:outline-none"
                  />
                  <div
                    onClick={handleVisible}
                    className={`bg-gray-100 py-1 ${
                      visible ? "px-[7px]" : "px-2"
                    }`}
                  >
                    {visible ? (
                      <FontAwesomeIcon
                        className="text-[#a97231]"
                        icon={faEyeSlash}
                      />
                    ) : (
                      <FontAwesomeIcon
                        className="text-[#a97231]"
                        icon={faEye}
                      />
                    )}
                  </div>
                </div>
                <div className={`p-2 cursor-pointer w-5 rounded-sm mt-1`}></div>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className=" p-2 text-white w-full mt-2 bg-[#a97231] flex justify-center"
              >
                {loading ? `Loading...` : `Register`}
              </button>
            </div>
          </form>
        </div>
        <p className="text-center my-5 font-light text-white">
          Have an Account?
          <span className=" cursor-pointer font-semibold">
            <Link href={"/auth/login"}> Sign in here</Link>
          </span>
        </p>
      </div>
    );
}