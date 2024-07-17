import { signIn, signOut, useSession } from "next-auth/react"

export default function Navbar(){
    const {data} = useSession()
    return(
        <div className="flex items-center justify-end w-full h-16 bg-dark fixed">
            <button className="bg-primary text-white font-semibold py-3 px-4 mx-2 rounded-xl" onClick={() => (data ? signOut() : signIn())}>{data ? 'Log Out' : 'Log In'}</button>
        </div>
    )
}