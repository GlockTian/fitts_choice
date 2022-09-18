import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

export default function IntroFittsLaw() {
  // center point of the target
  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);
  const [buttonHeight, setHeight] = useState(0);
  const [buttonWidth, setWidth] = useState(0);
  const [dis,setDistance] = useState(0);
  const [fittsOn, setOn] = useState(true)
  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (typeof window != "undefined" ) {
        var buttonAttr = window.document.getElementById('element').getBoundingClientRect()
        setButtonX(buttonAttr.x)
        setButtonY(buttonAttr.y)
        setHeight(buttonAttr.height -10)
        setWidth(buttonAttr.width)
        setDistance(calculateDistance(
          buttonX,
          buttonY,
          buttonWidth,
          buttonHeight,
          ev.clientX,
          ev.clientY
        ))
        console.log(buttonX)
       }
    };

    window.addEventListener("mousemove", updateMousePosition);
    
  }, [dis]);

 

  return (
    
    <div className="bg-white" >
      {/* Page */}
      <main className={styles.main}>
        {/* Card */}
        <div className="w-4/5 max-w-screen-xl bg-white h-3/5  rounded-[60px] drop-shadow-[0px_8px_10px_rgba(0,0,0,0.5)]">
          {/* Image */}
          <div className="w-full bg-white h-full min-h-[60%] rounded-[60px] min-w-[60%]">
            <Image
              src="/intro.png"
              alt="Fitts Law Image"
              layout="responsive"
              width={1069}
              height={723}
            />
          </div>
        </div>
        <div className="w-4/5 max-w-screen-xl mt-10 text-2xl font-semibold text-center text-black">
          Fitts's law (often cited as Fitts' law) is a predictive model of human
          movement primarily used in human–computer interaction and ergonomics.
          <br />
          The law predicts that{" "}
          <strong>the time required to rapidly move to a target area</strong> is
          a function of the ratio between the <strong>distance</strong> to the
          target and the <strong>width</strong> of the target.
        </div>
        {fittsOn?
        <button
        id="element"
        className="pt-5 pb-5 pl-5 pr-5 mt-10 text-white truncate drop-shadow-l bg-sky-500 border-sky-500 rounded-2xl"
        style={{width: dis+'px', minWidth: '120px',minHeight:'90px', maxWidth:'55%',maxHeight:'90px'}}
        
      >
        This is going to be a button
      </button>:
      <button
      id="element"
      className="pt-5 pb-5 pl-5 pr-5 mt-10 text-white truncate drop-shadow-l bg-sky-500 border-sky-500 rounded-2xl"
      style={{ minWidth: '120px',minHeight:'90px', maxWidth:'55%',maxHeight:'90px'}}
    >
      This is going to be a button
    </button>}

    <button
      id="element"
      className="pt-5 pb-5 mt-10 text-white truncate drop-shadow-l bg-sky-500 border-sky-500 rounded-2xl"
      onClick={() => setOn(!fittsOn)}
    >
      Toggle
    </button>
      
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}


function calculateDistance(elemx, elemy, width, height, mouseX, mouseY) {
  var dis = Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elemx + width / 2), 2) +
        Math.pow(mouseY - (elemy + height / 2), 2)
    )
  );

  return dis
}
