"use client"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


export default function Register() {

    const router = useRouter()

    const [user, setUser] = useState({
        name: "", email: "", password: ""
    })



    const handleRegister = async () => {
        console.log(user)
        const { name, email, password } = user
        if (!name || !email || !password) {
            toast.error("Enter Valid Inputs!!")
        }
        else {
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(user)
            })
            console.log(response)
            const res = await response.json()
            console.log(res)
            if (response.status === 201) {

                toast.success("Registration Successfull!!")
                router.push('/login')
            }
            else {
                toast.error("Registration Failed!!")
            }
            setUser({
                name:"",email:"",password:""
            })
        }
    }
    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center">
                <div className="border-2 border-blue-300 rounded-2xl p-3 w-100 bg-blue-100 shadow-2xl">
                    <h1 className="text-center my-2 text-4xl">User Register</h1>
                    <div>
                        <div className="mt-5 mb-3 w-full">
                            <input type="text" onChange={(e) => { setUser({ ...user, name: e.target.value }) }} placeholder="Name" className="rounded bg-gray-100 p-3 w-full" />
                        </div>
                        <div className=" mb-3 w-full">
                            <input type="email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} placeholder="Email" className="rounded bg-gray-100 p-3 w-full" />
                        </div>
                        <div className="mb-3 w-full">
                            <input type="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} placeholder="Password" className="rounded bg-gray-100 p-3 w-full" />
                        </div>
                        <div className="grid grid-cols-2">
                            <button onClick={handleRegister} className="p-3 bg-green-600 text-white rounded">Register</button>
                            <Link href={'/login'} className="p-3 bg-yellow-200 text-center rounded">Already a user?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}