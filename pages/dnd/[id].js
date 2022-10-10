import fsPromises from "fs/promises";
import path from "path";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { DragPreviewImage, useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button, Group, Modal, RangeSlider, Slider } from "@mantine/core";

export default function Dnd(props) {
  const router = useRouter();
  const { id } = router.query;
  const questions = props.questions;
  const num = parseInt(id, 10);
  const allOptions = [
    questions[num].A,
    questions[num].B,
    questions[num].C,
    questions[num].D,
  ];

  const [answer, setAnswer] = useState(-1);
  const [size, setSize] = useState(20);
  const [position, setPosition] = useState(0);
  const [openedSetting, setOpenedSetting] = useState(true);
  const next = "/dnd/" + questions[num].nextId.toString();

  const updateSelection = (index, item) => {
    // mocking for answers
    setAnswer(item);
  };
  const [allTimes, setAllTimes] = useState([]);

  const [totalDrag, setTotalDrag] = useState(0);
  const increaseTotalDrag = () => setTotalDrag(totalDrag + 1);
  const [errorDrag, setErrorDrag] = useState(0);
  const increaseErrorDrag = () => setErrorDrag(errorDrag + 1);
  const updateAverageTime = (time) => {
    const oldAllTimes = [...allTimes];
    oldAllTimes.push(time);
    setAllTimes(oldAllTimes);
  };

  const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };

  return (
    <div>
      <Loading />
      <div className="my-10 text-3xl font-bold text-center">
        Question: {questions[num].title}
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="flex justify-center w-full">
          <DropSection
            onUpdateSelection={updateSelection}
            size={size}
            question={questions[num].title}
          />
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
                    updateAverageTime={updateAverageTime}
                    totalDrag={totalDrag}
                    errorDrag={errorDrag}
                    increaseTotalDrag={increaseTotalDrag}
                    increaseErrorDrag={increaseErrorDrag}
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
            max={60}
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
            max={50}
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
          className="primary"
          onClick={() => router.push(next)}
        >
          Next question!
        </Button>
      </Group>
      <Group style={{ position: "fixed", bottom: 20 }}>
        <div className="text-xl">
          Average Time: {round(average(allTimes) / 100, 2) || 0} seconds
        </div>
        <div className="text-xl">
          Error Rate: {round((errorDrag / totalDrag) * 100, 2) || 0}%
        </div>
      </Group>
    </div>
  );
}

function Loading() {
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return pageLoading ? (
    <div className="absolute flex flex-col items-center justify-center w-[99vw] h-[70vh] bg-white">
      <div className="absolute flex items-center justify-center bg-blue-600 w-72 h-72 animate-spin">
        <div className="w-56 h-56 bg-white" />
      </div>
    </div>
  ) : (
    <></>
  );
}

function DropSection({ onUpdateSelection, size, question }) {
  // support multiple dropping zone, can be removed
  return (
    <div className="mx-5">
      <div className="flex flex-row gap-5">
        <Dustbin
          onUpdateSelection={onUpdateSelection}
          size={size}
          question={question}
        />
      </div>
    </div>
  );
}

function Box({
  content,
  index,
  isAvailable,
  updateAverageTime,
  totalDrag,
  errorDrag,
  increaseTotalDrag,
  increaseErrorDrag,
}) {
  // dragging triggers at box
  const [startTime, setStartTime] = useState(Date.now());
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "box",
      item: { content, index },

      end: (item, monitor) => {
        increaseTotalDrag();
        // dropping parameters
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          updateAverageTime(
            Math.abs(
              new Date(startTime).getTime() - new Date(Date.now()).getTime()
            )
          );
        } else {
          increaseErrorDrag();
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [startTime]
  );

  const boxStyle = { width: 150, height: 90 };

  if (!isDragging & isAvailable) {
    return (
      <div
        ref={drag}
        onDragStart={() => {
          setStartTime(Date.now());
        }}
        data-testid={`box`}
      >
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

function Dustbin({ onUpdateSelection, size, question }) {
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

  useEffect(() => {
    setId("");
    setContent("");
    onUpdateSelection(-1);
  }, [question]);
  return (
    <Clickable ref={content === "" ? drop : null} data-testid="dustbin">
      <div
        style={{
          width: size * 5 + 50 + "px",
          height: size * 5 + 50 + "px",
          backgroundColor: isActive ? "LightGreen" : canDrop,
        }}
        className="border-2 border-blue-600"
        onClick={() => {
          setId("");
          setContent("");
          onUpdateSelection(-1);
        }}
      >
        {content === "" ? (
          <div className="flex items-center justify-center w-full h-full text-xs font-bold">
            Drag the answer Here!
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-3xl font-bold text-white bg-blue-600">
            {content}
          </div>
        )}
        {content === "" ? null : (
          <div className="flex items-center justify-center pt-1 text-sm italic font-bold text-gray-500">
            Click to unselect
          </div>
        )}
      </div>
    </Clickable>
  );
}

export async function getStaticPaths() {
  const relativeToPub = "question";
  const dir = path.resolve("./public", relativeToPub);
  const filePath = path.join(dir, "questions.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  const questions = objectData.questions;

  const paths = questions.map((question) => ({
    params: { id: question.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps() {
  const relativeToPub = "question";
  const dir = path.resolve("./public", relativeToPub);
  const filePath = path.join(dir, "questions.json");
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return { props: objectData };
}
