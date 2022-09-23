
import fsPromises from 'fs/promises';
import path from 'path';
import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useState } from "react";
import { DragPreviewImage, useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button, Group, Modal, RangeSlider, Slider } from '@mantine/core';

export default function Dnd(props) {
    
  const router = useRouter();
    const { id } = router.query;
    const questions = props.questions;
    const num = parseInt(id,10);
    const allOptions = [questions[num].A, questions[num].B, questions[num].C, questions[num].D];


    const [answer, setAnswer] = useState(-1);

    const [size, setSize] = useState(20);
    const [position, setPosition] = useState(0);
  
    const [openedSetting, setOpenedSetting] = useState(false);


  const next = "/dnd/"+questions[num].nextId.toString();

  
  const updateSelection = (index, item) => {
    // mocking for answers
    setAnswer(item);
  };

  return (
    <div>

      <div className="my-10 text-3xl font-bold text-center">
        Question: {questions[num].title}
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-center w-full">

          <DropSection onUpdateSelection={updateSelection} size={size} />
        </div>
        <div style={{ height: position * 5 + "px" }} />

        <div className="mt-2">
          <div className="flex justify-center">
              {allOptions.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="p-5">
                    <Box
                      index={index}
                      content={item}
                      isAvailable={index !== answer}
                    />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </div>
      </DndProvider>


      <Modal
        opened={openedSetting}
        onClose={() => setOpenedSetting(false)}
        title="Setting"
      >
        <p className="text-sm text-gray-500">
          Experiment with target size and distance!
        </p>
        <div className="flex flex-row items-center justify-between gap-5 mt-8">
          <p className="font-semibold">Target Size</p>
          <Slider
            labelAlwaysOn
            value={size}
            onChange={setSize}
            className="w-1/2 "
          />
        </div>
        {/* tailwind center horizontally and vertically  */}
        <div className="flex flex-row items-center justify-between gap-5 mt-5">
          <p className="font-semibold">Target Distance</p>
          <Slider
            labelAlwaysOn
            value={position}
            onChange={setPosition}
            className="w-1/2 "
          />
        </div>
      </Modal>




      <Group position="right">
        <Button
          color="gray"
          radius="xl"
          variant="outline"
          onClick={() => setOpenedSetting(true)}
        >
          <div className="px-2 text-xl text-blue-500">Settings</div>
        </Button>
          <Button
            radius="xl"
            variant='outline'
            onClick={() => router.push(next)}
            className="px-2 text-xl text-blue-500"
          >
            Next question!
          </Button>

      </Group>
    </div>
  );
}




function DropSection({ onUpdateSelection, size }) {
  // support multiple dropping zone, can be removed
  return (
    <div className="mx-5">
      <div className="flex flex-row gap-5">
        <Dustbin onUpdateSelection={onUpdateSelection} size={size} />
      </div>
    </div>
  );
}

function Box({ content, index, isAvailable }) {
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

  const boxStyle = { width: 150, height: 90 };

  if (!isDragging & isAvailable) {
    return (
      <div ref={drag} data-testid={`box`}>
        <div
          className="z-50 flex items-center justify-center text-3xl font-bold text-white bg-blue-600"
          style={boxStyle}
        >
          {content}
        </div>
      </div>
    );
  } else {
    //placeholder prevent collapse
    return <div style={boxStyle} />;
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
  const Clickable = content !== "" ? "button" : "div";
  return (
    <Clickable ref={content === "" ? drop : null} data-testid="dustbin">
      <div
        style={{
          width: size * 5 + 50 + "px",
          height: size * 5 + 50 + "px",
          backgroundColor: isActive ? "red" : canDrop && "green",
        }}
        className="border-2 border-blue-600"
        onClick={() => {
          setId("");
          setContent("");
          onUpdateSelection(-1);
        }}
      >
        {content === "" ? (
          <div className="flex items-center justify-center w-full h-full text-3xl font-bold" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-3xl font-bold text-white bg-blue-600">
            {content}
          </div>
        )}
      </div>
    </Clickable>
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



