import React from 'react'
import fsPromises from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Test(props){
    const router = useRouter();
    const { id } = router.query;
    const questions = props.questions;
    const num = parseInt(id,10)-1
    const next = "/test/"+questions[num].nextId.toString();
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card">
          <div className="card-body text-center">
          <h2>{questions[num].id}.{" "}{questions[num].title}</h2>
          <h3>A.{questions[num].A}{" "}{" "}B.{questions[num].B}</h3>
              <h3>C.{questions[num].C}{" "}{" "}D.{questions[num].D}</h3>
              <p>{questions[num].answer}</p>
              <p>{next}</p>
              <Link href={{pathname :next}}>
                <a>Next question!</a>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
    const relativeToPub = 'question';
    const dir = path.resolve('./public', relativeToPub);
    const filePath = path.join(dir,'questions.json')
    const jsonData = await fsPromises.readFile(filePath);
    const objectData = JSON.parse(jsonData);
    const questions = objectData.questions;

  const paths = questions.map((question) => ({
    params: { id: question.id.toString() },
  }))

  return { paths, fallback: false }
}


export async function getStaticProps() {
  const relativeToPub = 'question';
  const dir = path.resolve('./public', relativeToPub);
  const filePath = path.join(dir,'questions.json')
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return { props:  objectData  }
}
