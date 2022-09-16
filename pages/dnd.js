import React from "react";
import { useState } from "react";
import { DragPreviewImage, useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DndTesting() {
  const allOptions = [1, 2, 3, 4];
  const [answer, setAnswer] = useState(0);
  const [size, setSize] = useState(150);
  const [position, setPosition] = useState(0);

  const updateSelection = (index, item) => {
    console.log(index);
    setAnswer(item);
  };

  return (
    <div>
      <>1 + 1等于多少</>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-row z-40">
          <DropSection onUpdateSelection={updateSelection} size={size} />
        </div>
        <div style={{ height: position + "px" }} />
        <div className="mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 ">
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
      <>size</>
      <input onChange={(e) => setSize(e.target.value)} />
      <>pos</>
      <input onChange={(e) => setPosition(e.target.value)} />
    </div>
  );
}

function DropSection({ onUpdateSelection, size }) {
  return (
    <div className="mx-5">
      <div className="flex justify-center mt-3"></div>
      <div className="h-2" />

      <div className="flow flow-row w-40">
        <div className="flex flex-row gap-5">
          <Dustbin onUpdateSelection={onUpdateSelection} size={size} />
        </div>
      </div>
    </div>
  );
}

function Box({ content, index }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "box",
    item: { content, index },
    end: (item, monitor) => {
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
    //place holder prevent collapse
    return <div style={{ width: 150, height: 150 }} />;
  }
}

function Dustbin({ onUpdateSelection, size }) {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
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
        <div className="w-full h-full flex justify-center items-center">
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
