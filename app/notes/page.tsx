"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
import { FaUser } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { CiCalendarDate } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Note {
    _id: string;
    title: string;
    description: string;
    userMail: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}



export default function Notes() {
    const session = useSession()
    console.log(session)
    const [notes, setNotes] = useState<Note[]>([])

    const getNotes = async () => {
        const response = await fetch('/api/notes')
        const result = await response.json()
        console.log(result)
        setNotes(result.filter((note: any) => note.userMail == session?.data?.user?.email))
    }

    const deleteNote=async(id:any)=>{
        const response=await fetch(`/api/notes/${id}`,{
            method:"DELETE"
        })
        if(response.status===200){
            toast.success("Note Deleted!!")
            getNotes()
        }
        else{
            toast.error("Something Went Wrong!!")
        }
    }   

    console.log(notes)
    useEffect(() => {
        getNotes()
    }, [session])

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
            <div className="md:mx-40 m-5">
                {/* Header */}
                <div className="mb-10 flex justify-between items-center">
                    <div className="text-xl flex items-center text-blue-400">
                        <span className="ms-2">Miniso</span>
                    </div>
                    <div className="text-xl flex items-center text-blue-400">
                        <p className="me-5 flex items-center">
                            <FaUser />{' '}
                            {session?.data?.user?.name}
                        </p>
                        <button className="border border-black p-3 rounded hover:bg-red-500 hover:text-white"
                            onClick={() => signOut()}>
                            <FaPowerOff />
                        </button>
                    </div>
                </div>
                {/* note */}
                <div className="bg-gray-200 p-5 rounded grid md:grid-cols-4 gap-2">
                    {
                        notes.map((item: any) => (
                            <div key={item?._id} className={`bg-${item?.color}-200 p-3 rounded-lg flex flex-col justify-between`}>
                                <div>
                                    <div className="flex justify-between items-center">
                                        <h1 className="text-lg font-bold">{item?.title}</h1>
                                        <Link href={`/notes/${item?._id}`}>
                                            <FaEdit />
                                        </Link>
                                    </div>
                                    <div>
                                        <span className="font-semibold">Description :</span>
                                        <p>
                                            {item?.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm font-light text-gray-400 flex gap-2 items-center">
                                        <CiCalendarDate />
                                        {new Date(item?.createdAt).toLocaleDateString()}
                                    </span>
                                    <button onClick={()=>{deleteNote(item?._id)}} className="text-red-600 hover:cursor-pointer">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {/* add note */}

                    <div className="border border-black p-3 rounded bg-white flex flex-col justify-center items-center text-2xl">
                        <FaEdit />
                        <Link href={'/notes/add'}>
                            New Note
                        </Link>
                    </div>
                </div>

            </div>
        </>
    )
}