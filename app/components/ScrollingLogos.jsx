"use client";

import { motion } from "framer-motion";
import {
  SiBurton,
  SiBmw,
  SiHeroku,
  SiBuildkite,
  SiCouchbase,
  SiDailymotion,
  SiDeliveroo,
  SiEpicgames,
  SiGenius,
  SiGodaddy,
} from "react-icons/si";
import SchoolLogo from "@/public/images/school-logo.png";
import DhuLogo from "@/public/images/dhu-logo.png";
import EmploymentLogo from "@/public/images/employment-logo.png";
import HrdkLogo from "@/public/images/hrdk-logo.jpeg";
import KyungbukLogo from "@/public/images/kyungbuk-logo.png";
import Image from "next/image";
import Link from "next/link";

const TranslateWrapper = ({ children, reverse }) => {
  return (
    <motion.div
      initial={{ translateX: reverse ? "-100%" : "0%" }}
      animate={{ translateX: reverse ? "0%" : "-100%" }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      className="flex gap-10 px-2 "
    >
      {children}
    </motion.div>
  );
};

const LogoItem = ({ children, link }) => {
  return (
    <Link
      href={link}
      rel="nofollow"
      target="_blank"
      className="w-44 h-20 flex justify-center items-center transition-colors"
    >
      {children}
    </Link>
  );
};

const LogoItems = () => (
  <>
    <LogoItem link="https://school.gyo6.net/gbm/main.do">
      <Image src={SchoolLogo} alt="school-logo" />
    </LogoItem>
    <LogoItem link="https://iacf.dhu.ac.kr/main">
      <Image src={DhuLogo} alt="dhu-logo" />
    </LogoItem>
    <LogoItem link="https://www.moel.go.kr/index.do">
      <Image src={EmploymentLogo} alt="employ-logo" />
    </LogoItem>
    <LogoItem link="https://www.hrdkorea.or.kr">
      <Image src={HrdkLogo} alt="hrdk-logo" />
    </LogoItem>
    <LogoItem link="https://www.gbe.kr/main/main.do">
      <Image src={KyungbukLogo} alt="kyungbuk-logo" />
    </LogoItem>
  </>
);

export function ScrollingLogos() {
  return (
    <section className="bg-white w-full overflow-hidden mx-auto py-4">
      <div className="flex">
        <TranslateWrapper>
          <LogoItems />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems />
        </TranslateWrapper>
        <TranslateWrapper>
          <LogoItems />
        </TranslateWrapper>
      </div>
    </section>
  );
}
