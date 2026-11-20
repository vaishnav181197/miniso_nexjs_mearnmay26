"use client"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

export default function Login() {

    const [user,setUser]=useState({
        email:"",password:""
    })

    const handleSubmit=async(e:Event)=>{
        e.preventDefault()
        console.log(user)
        const {email,password}=user
        if(email && password){
            const res=await signIn("credentials",{email,password,redirect:false})
            console.log(res)
            if(res?.ok){
                toast.success("Login Successfull!!")
                setTimeout(()=>{
                    window.location.href="/notes"
                },1000)
            }
            else{
                toast.error("Login Failed!!! Invalid Credentials")
                setUser({email:"",password:""})
            }
        }
        else{
            toast.error("Enter Valid Inputs!!")
        }
    }

    return (
        <>
            <div className="min-h-screen w-full flex justify-center items-center">
                <div className="border-2 border-blue-300 rounded-2xl p-3 w-100 bg-blue-100 shadow-2xl">
                    <h1 className="text-center my-2 text-4xl">Login</h1>
                    <div>
                        <form action="" onSubmit={(e:any)=>{handleSubmit(e)}}>
                            <div className="mt-5 mb-3 w-full">
                                <input type="email" value={user.email} onChange={(e)=>{setUser({...user,email:e.target.value})}} placeholder="Email" className="rounded bg-gray-100 p-3 w-full" />
                            </div>
                            <div className="mb-3 w-full">
                                <input type="password"value={user.password} onChange={(e)=>{setUser({...user,password:e.target.value})}} placeholder="Password" className="rounded bg-gray-100 p-3 w-full" />
                            </div>
                            <div className="grid grid-cols-2">
                                <button className="p-3 bg-blue-600 text-white rounded">Login</button>
                                <Link href={'/register'} className="p-3 bg-green-200 text-center rounded">New user?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}