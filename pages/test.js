import Head from 'next/head';
import fsPromises from 'fs/promises';
import path from 'path';
import getConfig from 'next/config';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';



export default function Test(props){
    const questions = props.questions;
    const [index,setindex]=useState(0);
    const incrementCount = param => e => {
        setindex(param-1);

    }
    return (
      <div style={{ padding: 30 }}>
        <Head>
          <title>Question display</title>
        </Head>
        <div>
              
              <h2>{questions[index].id}.{" "}{questions[index].title}</h2>
              <h3>A.{questions[index].A}{" "}{" "}B.{questions[index].B}</h3>
              <h3>C.{questions[index].C}{" "}{" "}D.{questions[index].D}</h3>
              <p>{questions[index].answer}</p>
              <button onClick={incrementCount(questions[index].nextId)}>Next</button>
            
        </div>
      </div>
    )
    
}

export async function getStaticProps() {
  const relativeToPub = 'question';
  const dir = path.resolve('./public', relativeToPub);
  const filePath = path.join(dir,'questions.json')
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}