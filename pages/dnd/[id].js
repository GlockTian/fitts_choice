
import fsPromises from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from "react";
import { DragPreviewImage, useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Dnd(props) {
    
  const router = useRouter();
    const { id } = router.query;
    const questions = props.questions;
    const num = parseInt(id,10)-1;
    const allOptions = [questions[num].A, questions[num].B, questions[num].C, questions[num].D];
  const [answer, setAnswer] = useState(0);
  const [size, setSize] = useState(150);
  const [position, setPosition] = useState(0);
  const next = "/dnd/"+questions[num].nextId.toString();

  
  const updateSelection = (index, item) => {
    // mocking for answers
    setAnswer(item);
  };

  return (
    <div>
      <h2>{questions[num].id}.{" "}{questions[num].title}</h2>
      <DndProvider backend={HTML5Backend}>
        <div className="z-40 flex flex-row">
          <DropSection onUpdateSelection={updateSelection} size={size} />
        </div>
        <div style={{ height: position + "px" }} />
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
            {allOptions.map((item, index) => (
              <React.Fragment key={index}>
                <div className="p-4">
                  <Box index={index} content={item} />
                </div>
              </React.Fragment>
            ))}
             
          </div>
        </div>
      </DndProvider>
      <div>size:</div>
      <input onChange={(e) => setSize(e.target.value)} />
      <div>pos:</div>
      <input onChange={(e) => setPosition(e.target.value)} />
      <Link href={{pathname :next}}>
                <a>Next question!</a>
              </Link>
    </div>
  );
}

function DropSection({ onUpdateSelection, size }) {
  // support multiple dropping zone, can be removed
  return (
    <div className="mx-5">
      <div className="flex justify-center mt-3"></div>
      <div className="h-2" />
      <div className="w-40 flow flow-row">
        <div className="flex flex-row gap-5">
          <Dustbin onUpdateSelection={onUpdateSelection} size={size} />
        </div>
      </div>
    </div>
  );
}

function Box({ content, index }) {
  // dragging triggers at box
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { content, index },
    end: (item, monitor) => {
      // dropping parameters
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  if (!isDragging) {
    return (
      <div ref={drag} data-testid={`box`}>
        <div
          className="z-50 flex items-center justify-center bg-gray-200"
          style={{ width: 150, height: 150 }}
        >
          {content}
        </div>
      </div>
    );
  } else {
    //placeholder prevent collapse
    return <div style={{ width: 150, height: 150 }} />;
  }
}

function Dustbin({ onUpdateSelection, size }) {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  // targeting triggers
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "box",
    drop: (d) => {
      setId(d.index);
      setContent(d.content);
      onUpdateSelection(d.index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  return (
    <div ref={content === "" ? drop : null} data-testid="dustbin">
      <div
        style={{
          width: size + "px",
          height: size + "px",
          backgroundColor: isActive ? "red" : canDrop && "green",
        }}
        className="bg-blue-300 "
      >
        <div className="flex items-center justify-center w-full h-full">
          {content}
        </div>
        <button
          className="absolute"
          onClick={() => {
            setId("");
            setContent("");
            onUpdateSelection(id);
          }}
        >
          ↩️
        </button>
      </div>
    </div>
  );
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



