import { AppShell, Navbar, Header, Button } from '@mantine/core';
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
    <div className='pt-2 pl-2'>
      <Link href="/"><Button className={navStyle("/")}>Home</Button></Link>
        <Link href="/dnd/0"><Button className={navStyle("/dnd")}>{"Fitts' Choice"}</Button></Link>
        <Link href="/intro"><Button className={navStyle("/intro")}>{"Fitts' Law"}</Button></Link>
      { children }
    </div>
  );
}