import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { Switch, Button, Modal, Center } from "@mantine/core";
import { CircleCheck } from "tabler-icons-react";
import { useRouter } from "next/router";

export default function IntroFittsLaw() {
  const router = useRouter();

  // center point of the target
  const [buttonX, setButtonX] = useState(0);
  const [buttonY, setButtonY] = useState(0);
  const [buttonHeight, setHeight] = useState(0);
  const [buttonWidth, setWidth] = useState(0);
  const [dis, setDistance] = useState(0);
  const [fittsOn, setOn] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (
        typeof window != "undefined" &&
        window.document.getElementById("element")
      ) {
        var buttonAttr = window.document
          .getElementById("element")
          .getBoundingClientRect();
        setButtonX(buttonAttr.x);
        setButtonY(buttonAttr.y);
        setHeight(buttonAttr.height - 10);
        setWidth(buttonAttr.width);
        setDistance(
          calculateDistance(
            buttonX,
            buttonY,
            buttonWidth,
            buttonHeight,
            ev.clientX,
            ev.clientY
          )
        );
      }
    };
    if (fittsOn) {
      window.addEventListener("mousemove", updateMousePosition);
    } else {
      window.removeEventListener("mousemove", updateMousePosition);
    }
  }, [dis, fittsOn]);

  return (
    <div className="bg-white">
      {/* Page */}
      <main className={styles.main}>
        {/* Card */}
        <div className="w-2/5 max-w-screen-xl bg-white  rounded-[60px] drop-shadow-[0px_8px_10px_rgba(0,0,0,0.5)]">
          {/* Image */}
          <div className="p-3 w-full bg-white h-full min-h-[60%] rounded-[60px] min-w-[60%]">
            <Image
              src="/intro.png"
              alt="Fitts Law Image"
              layout="responsive"
              width={969}
              height={623}
            />
          </div>
        </div>
        <div className="w-4/5 max-w-screen-xl mt-10 text-center text-black">
          {
            "Fitts's law (often cited as Fitts' law) is a predictive model of human movement primarily used in human–computer interaction and ergonomics."
          }
          <br />
          The law predicts that{" "}
          <strong>the time required to rapidly move to a target area</strong> is
          a function of the ratio between the <strong>distance</strong> to the
          target and the <strong>width</strong> of the target.
        </div>
        {fittsOn ? (
          <button
            id="element"
            className="flex inline-flex items-center justify-center px-4 py-2 pt-5 pb-5 pl-5 pr-5 mt-10 font-bold text-white truncate bg-grey-light hover:bg-grey text-grey-darkest primary drop-shadow-l rounded-2xl"
            style={{
              width: dis / 2.5 + "px",
              height: dis / 2.5 + "px",
              minWidth: "235px",
              minHeight: "90px",
              maxWidth: "55%",
              maxHeight: "300px",
            }}
            onClick={() => {
              setOn(false);
              router.push("/");
            }}
          >
            <CircleCheck />
            <span className="ml-3">Understand</span>
          </button>
        ) : (
          <button
            className="flex inline-flex items-center justify-center px-4 py-2 pt-5 pb-5 pl-5 pr-5 mt-10 font-bold text-white truncate bg-grey-light hover:bg-grey text-grey-darkest primary drop-shadow-l rounded-2xl"
            style={{
              minWidth: "235px",
              minHeight: "90px",
              maxWidth: "55%",
              maxHeight: "90px",
            }}
            onClick={() => {
              setOn(false);
              router.push("/");
            }}
          >
            <CircleCheck />

            <span className="ml-3">Understand</span>
          </button>
        )}
        <div className="mt-5 align-middle form-check">
          <input
            className="justify-center float-left w-5 h-5 mt-1 mr-2 align-middle transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            size="lg"
            checked={fittsOn}
            onChange={(event) => setOn(event.currentTarget.checked)}
          />
          <label
            className="justify-center inline-block italic text-gray-500 align-middle form-check-label"
            htmlFor="flexCheckChecked"
          >
            {!fittsOn
              ? "Turn on to see the button size adjustment based on Fitt's Law"
              : "The further the cursor the bigger the button"}
          </label>
        </div>
      
      </main>
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

  return dis;
}
