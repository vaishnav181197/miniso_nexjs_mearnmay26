"use client"
import Link from "next/link"
import { IoIosClose } from "react-icons/io";
import { useState,useEffect } from "react";
import { Inote } from "@/models/noteModel";
import { useSession } from "next-auth/react";
import { redirect,useParams } from "next/navigation";
import toast from "react-hot-toast";



export default function Note() {
    const session = useSession()
    const {id}=useParams()
    // console.log(params)
    const [noteDetails, setNoteDetails] = useState({
        title: "", description: "", color: "", userMail: session?.data?.user?.email
    })

    const getNote=async()=>{
        const response=await fetch(`/api/notes/${id}`)
        const result=await response.json()
        // console.log(result)
        setNoteDetails(result)
    }

    useEffect(()=>{
        getNote()
    },[id])

    const handleSubmit=async()=>{
        console.log(noteDetails)
        const {title,description,color}=noteDetails
        if(!title || !description || !color){
            toast.error("Enter Valid Inputs!!")
        }
        else{
            const response=await fetch(`/api/notes/${id}`,{
                method:"PUT",
                body:JSON.stringify(noteDetails)
            })
            if(response.status===200){
                toast.success("Note Updated!!")
                redirect('/notes')
            }
            else{
                toast.error("Note Updation Failed!!")
            }
        }
    }

    if (session?.status === "unauthenticated") {
        redirect('/login')
    }

    if (session?.status === "loading") {
        return (
            <p className="text-center my-10 text-xl">Loading...</p>
        )
    }
    return (
          <>
            <div className="w-full h-screen flex justify-center items-center">
                <div className="md:w-1/3 shadow-2xl p-2 rounded-lg bg-amber-50">
                    <h1>Update Note</h1>
                    <div className="flex justify-between items-center p-2">
                        <button onClick={()=>{
                            
                            redirect('/notes')   
                        }} className="text-xl">
                            <IoIosClose />
                        </button>
                        <button onClick={handleSubmit} className="bg-orange-500 text-white px-2 py-1 rounded-3xl">
                            Update
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Themes:</span>
                        <div className="flex w-1/2 justify-around">
                            <span onClick={() => { setNoteDetails({ ...noteDetails, color: "pink" }) }}
                                className={noteDetails.color == "pink" ? "px-2 border-3 bg-pink-200 rounded-full" : "px-2 border bg-pink-200 rounded-full"}></span>
                            <span onClick={() => { setNoteDetails({ ...noteDetails, color: "yellow" }) }}
                                className={noteDetails.color == "yellow" ? "px-2 border-3 bg-yellow-200 rounded-full" : "px-2 border bg-yellow-200 rounded-full"}></span>
                            <span onClick={() => { setNoteDetails({ ...noteDetails, color: "sky" }) }}
                                className={noteDetails.color == "sky" ? "px-2 border-3 bg-sky-200 rounded-full" : "px-2 border bg-sky-200 rounded-full"}></span>
                            <span onClick={() => { setNoteDetails({ ...noteDetails, color: "green" }) }}
                                className={noteDetails.color == "green" ? "px-2 border-3 bg-green-200 rounded-full" : "px-2 border bg-green-200 rounded-full"}></span>
                        </div>
                    </div>
                    <div>
                        Title:
                        <input type="text" value={noteDetails.title} onChange={(e) => { setNoteDetails({ ...noteDetails, title: e.target.value }) }} className="w-full bg-white" />
                        Description:
                        <textarea name="" value={noteDetails.description} onChange={(e) => { setNoteDetails({ ...noteDetails, description: e.target.value }) }} id="" className="w-full bg-white"></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}