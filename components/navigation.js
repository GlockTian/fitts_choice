import Link from 'next/link';
import { useRouter } from 'next/router';

export function Navigation({children}) {
  const router = useRouter()
  const navStyle = (path)=>{
    if (path === "/"){
      return router.pathname === path
      ?"mx-2 rounded-none px-0 border-b-blue-400 text-primary bg-paper"
      :"mx-2 rounded-none px-0 bg-paper text-black"
    }
    return router.pathname.includes(path)
    ?"mx-2 rounded-none px-0 border-b-blue-400 text-primary bg-paper"
    :"mx-2 rounded-none px-0 bg-paper text-black"
  }

  return (
    <div className='pt-4 pl-4 border-red-500'>
      <Link href="/"><button className={navStyle("/")}>Home</button></Link>
        <Link href="/dnd/0"><button className={navStyle("/dnd")}>{"Fitts' Choice"}</button></Link>
        <Link href="/intro"><button className={navStyle("/intro")}>{"Fitts' Law"}</button></Link>
      { children }
    </div>
  );
}