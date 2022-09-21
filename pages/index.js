import { Button, Group, Space } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.main}>
          <div className="card pt-12 pb-10 flex flex-col item-center max-w-xl">
      {/* create a zoom liked login page */}
      <h1 className={styles.title}>Fitts' Choice</h1>
      <p className={styles.subtitle}>An experiential learning activity for Fitts' Law</p>
      <Space h={40} />
      <Group position="center">
        <Button className="primary" radius={20} onClick={() => router.push("/dnd")}>Start Now</Button>
      </Group>
      <Space h={60}  />

      <Group position="center">
        <Button variant='outline' radius={20} className="secondary" onClick={() => router.push("/intro")}>Learn more about Fitts' Law</Button>
      </Group>
    </div>
    </div>

  )
}
