import RegisterView from "@/components/views/auth/register";

export default function Register(){
    return (
      <div className="w-full flex items-center justify-center h-screen bg-[url('/img/registrasi.jpg')] bg-cover bg-center">
        <RegisterView />
      </div>
    );
}