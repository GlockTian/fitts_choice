import Head from 'next/head'
import fsPromises from 'fs/promises';
import path from 'path'
import getConfig from 'next/config'

export default function Test(props){
    const questions = props.questions;
    return (
      <div style={{ padding: 30 }}>
        <Head>
          <title>Question display</title>
        </Head>
        <div>
          {questions.map(question =>
            <div
              key={question.id}
              style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
              <h2>{question.title}</h2>
              <p>{question.answer}</p>
            </div>)}
        </div>
      </div>
    )
}

export async function getStaticProps() {
  const { serverRuntimeConfig } = getConfig()
  const relativeToPub = 'question';
  const dir = path.resolve('./public', relativeToPub);
  const filePath = path.join(dir,'questions.json')
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}