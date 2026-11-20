import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="md:grid grid-cols-2">
        <div className="p-2 flex flex-col justify-center">
          <h1 className="text-4xl text-blue-400 font-bolder">Miniso</h1>
          <p className="text-justify text-blue-600">Capture your ideas anytime.anywhere.</p>
          <p className="text-justify">
            Miniso is a simple, intuitive, and efficient note management application that helps users capture, organize, update, and manage their everyday thoughts and ideas in one place. Whether it's personal reminders, study notes, work-related information, or important tasks, NoteFlow makes note-taking effortless.
          </p>
          <Link href={'/login'} className="p-3 bg-blue-600 text-white rounded-2xl border shadow hover:bg-blue-900">
          Start Now {'->'}
          </Link>
        </div>
        <div>
          <Image src={'/landing.webp'} 
          alt="landing_image" width={500} height={300}/>
        </div>
      </div>
    </div>
  );
}
