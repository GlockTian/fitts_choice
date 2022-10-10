import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.main}>
          <div className="card pt-12 pb-10 flex flex-col item-center max-w-xl">
      {/* create a zoom liked login page */}
      <h1 className={styles.title}>{"Fitts' Choice"}</h1>
      <p className={styles.subtitle}>{"An experiential learning activity for Fitts' Law"}</p>
      
      <div className="flex flex-col mt-12 items-center justify-center">
        <button className="primary px-5 py-2 rounded-full " onClick={() => router.push("/dnd/0")}>Start Now</button>
      </div>

      <div className="flex flex-col mt-12 items-center justify-center">
        <button className="secondary px-10 py-5" onClick={() => router.push("/intro")}>{"Learn more about Fitts' Law"}</button>
      </div>
    </div>
    </div>

  )
}
