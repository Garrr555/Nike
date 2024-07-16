'use client'
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
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
              <Input
                label=""
                name="email"
                type="email"
                placeholder=""
                visible={false}
                handleVisible=""
              />
            </div>
            <div className="my-5">
              <p className="">Fullname</p>
              <Input
                label=""
                name="fullname"
                type="text"
                placeholder=""
                visible={false}
                handleVisible=""
              />
            </div>
            <div className="my-5">
              <p className="">Phone</p>
              <Input
                label=""
                name="phone"
                type="text"
                placeholder=""
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
              {/* <button
                type="submit"
                className=" p-2 text-white w-full mt-2 bg-[#a97231] flex justify-center"
              >
                {loading ? `Loading...` : `Register`}
              </button> */}
              <Button type="submit" variant="bg-[#a97231]">
                {loading ? `Loading...` : `Register`}
              </Button>
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