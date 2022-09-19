import { AppShell, Navbar, Header, Button } from '@mantine/core';
import Link from 'next/link';

export function Navigation({children}) {
  return (
    <AppShell
      padding="md"
      header={<Header  height={60} p="xs">
        <Link href="/"><Button className='primary'>Home</Button></Link>
        <Link href="/dnd"><Button className='primary'>Fitts' Choice</Button></Link>
        <Link href="/intro"><Button className='primary'>Fitts' Law</Button></Link>
      </Header>}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      { children }
    </AppShell>
  );
}