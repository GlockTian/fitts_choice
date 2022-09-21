import { AppShell, Navbar, Header, Button } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';




export function Navigation({children}) {
  const router = useRouter()
  const navStyle = (path)=>{
    return router.pathname === path
    ?"mx-2 rounded-none px-0 border-b-blue-400 text-primary bg-paper"
    :"mx-2 rounded-none px-0 bg-paper text-black"
  }

  return (
    <AppShell
      padding="md"
      header={<Header  height={60} p="xs">
        <Link href="/"><Button className={navStyle("/")}>Home</Button></Link>
        <Link href="/dnd"><Button className={navStyle("/dnd")}>Fitts' Choice</Button></Link>
        <Link href="/intro"><Button className={navStyle("/intro")}>Fitts' Law</Button></Link>
      </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      { children }
    </AppShell>
  );
}