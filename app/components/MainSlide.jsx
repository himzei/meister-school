/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    back: "https://school.gyo6.net/upload/ad/schl/gfsm/widg/img_51cbv6fee=9bv29=48v32=8cvd6=2c52v4705v3a67_v1138.png",
    description:
      "경북 바이오 마이스터 고등학교는 특화된 산업수요와 연계하여 예비 마이스터 [Young Meister]를 양성합니다. ",
    name: "바이오 분야 인재육성",
    title: "바이오 분야 인재육성",
    link: "https://www.daum.net",
    link2: "https://msn.com",
  },
  {
    back: "https://plus.unsplash.com/premium_photo-1663950995404-e18773895f8c?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendus ipsum .",
    name: "Johnathan Rodriguez",
    title: "This Week's New Comics",
    link: "https://www.google.com",
  },
  {
    back: "https://images.unsplash.com/photo-1705607984977-9057bb5fa8e2?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate",
    name: "Phil Heath",
    title: "What if...? Season 2",
    link: "https://www.naver.com",
  },
  {
    back: "https://images.unsplash.com/photo-1682687221073-53ad74c2cad7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum .",
    name: "Andrea Beck",
    title: "Echo Comics To Read",
    link: "https://www.kakao.com",
  },
  {
    back: "https://plus.unsplash.com/premium_photo-1664382465641-997aa3b73907?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Expedita sequi cupiditate harum repellendusda.",
    name: "Daniel Henderson",
    title: "Marvel's Blade' in Development",
    link: "https://www.marvel.com",
  },
];

const SelectBtns = ({ numTracks, setSelected, selected }) => {
  return (
    <div className="flex gap-2">
      {numTracks.map((item, index, array) => (
        <button
          key={index}
          onClick={() => setSelected(index)}
          className="h-2 w-full bg-slate-300 relative"
        >
          {selected === index ? (
            <motion.span
              className="absolute top-0 left-0 bottom-0 bg-red-600"
              initial={{
                width: "0%",
              }}
              animate={{
                width: "100%",
              }}
              transition={{
                duration: 5,
                ease: "easeOut",
              }}
              onAnimationComplete={() => {
                setSelected(selected === array.length - 1 ? 0 : selected + 1);
              }}
            />
          ) : (
            <span
              className="absolute top-0 left-0 bottom-0 "
              style={{ width: selected > index ? "100%" : "0%" }}
            />
          )}
          <p
            className={`text-gray-300 leading-5 ${
              selected === index && "text-red-600"
            } w-full h-16 text-left items-start pt-4 px-1 hidden md:flex `}
          >
            {item.title}
          </p>
        </button>
      ))}
    </div>
  );
};

const Card = ({
  back,
  description,
  name,
  link,
  link2,
  position,
  selected,
  setSelected,
}) => {
  const offset = position <= selected ? 0 : 100;

  return (
    <div className=" w-full h-full flex justify-center">
      <motion.div
        initial={false}
        style={{
          zIndex: position,
        }}
        animate={{
          x: `${offset}%`,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        onClick={() => setSelected(position)}
        className="absolute top-0 left-0 w-full min-h-full p-8 lg:p-12 flex flex-col items-center justify-center"
      >
        <div className="absolute top-0 left-0 w-full h-full flex justify-center">
          <img
            src={back}
            alt="lima"
            className="w-full h-full object-cover object-center "
          />
          <div className="absolute px-4 left-[50%] -translate-x-[50%] max-w-7xl w-full h-full flex flex-col justify-center space-y-4">
            <h1 className="text-white text-4xl font-bold uppercase ">{name}</h1>
            <p className="text-xl w-2/3 md:w-1/2 text-white">{description}</p>
            <div className="py-4 flex space-x-4">
              {link && (
                <Button asChild>
                  <Link href={link}>read more</Link>
                </Button>
              )}
              {link2 && (
                <Button asChild variant="secondary">
                  <Link href={link2}>unlock now</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Cards = ({ testimonials, selected, setSelected }) => (
  <div className="relative h-[650px]">
    {testimonials.map((item, index) => (
      <Card
        {...item}
        key={index}
        position={index}
        selected={selected}
        setSelected={setSelected}
      />
    ))}
  </div>
);

export function MainSlide() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="w-full flex flex-col overflow-hidden relative">
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />

      <div className="bg-black/70 absolute z-20 w-[880px] h-16 bottom-0 right-0">
        <SelectBtns
          numTracks={testimonials}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
    </section>
  );
}
