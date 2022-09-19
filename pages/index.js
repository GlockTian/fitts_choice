import { Button, Group, Space } from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.main}>
          <div className="card pt-12 pb-10 flex flex-col item-center max-w-xl">
      {/* create a zoom liked login page */}
      <h1 className={styles.title}>Fitts' Choice</h1>
      <p className={styles.subtitle}>An experiential learning activity for Fitts' Law</p>
      <Space h={40} />
      <Group position="center">
        <Button className="primary" radius={20} onClick={() => to(true)}>Start Now</Button>
      </Group>
      <Space h={60}  />

      <Group position="center">
        <Button variant='outline' radius={20} className="secondary" onClick={() => setOpenedSetting(true)}>Learn more about Fitts' Law</Button>
      </Group>
    </div>
    </div>

  )
}
