import LoginView from "@/components/views/auth/login";

export default function LoginPage(){
    return (
      <div className="w-full flex items-center justify-center h-screen bg-[url('/img/login.jpg')] bg-cover bg-center">
        <LoginView />
      </div>
    );
}