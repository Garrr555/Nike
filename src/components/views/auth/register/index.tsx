'use client'
import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import authServices from "@/services/auth";
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

        const result = await authServices.registerAccount(data)

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
      <AuthLayout
        title="Register"
        link="/auth/login"
        linkText="Have an account? "
        textColor="text-[#a97231]"
        error={error}
      >
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
            <Button type="submit" variant="bg-[#a97231] w-full">
              {loading ? `Loading...` : `Register`}
            </Button>
          </div>
        </form>
      </AuthLayout>
    );
}