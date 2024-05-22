/* eslint-disable @next/next/no-img-element */
import LocalMenus from "@/app/components/LocalMenus";
import Image from "next/image";
import dhuImage from "@/public/images/info/dhu.png";
import meisterSchool from "@/public/images/info/highschool.jpeg";

export default function Info2() {
  return (
    <div>
      {/* 로컬 네비게이션 */}
      <LocalMenus firstLocal="과정안내" secondLocal="과정안내" />
      {/* 제목 */}
      <div className="custom-width flex flex-col">
        <div className="flex flex-col text-center gap-2">
          <h1 className="text-3xl font-bold text-center">과정안내</h1>
          <p className="text-sm text-muted-foreground">
            미래유망분야 경북 바이오 마이스터 고등학교 수업일정을 확인하세요!
          </p>
        </div>
      </div>

      {/* 메인 이미지 */}
      <div className="max-w-[1800px] w-full h-[400px] bg-muted mx-auto overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503039153293-d4d2ba067754?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="과정안내"
          className="object-cover object-center"
        />
      </div>

      {/* 본문 글 */}
      <div className="custom-width grid grid-cols-[1fr_2fr] gap-10">
        <div>
          <h1 className="text-2xl font-semibold leading-9">AI・빅데이터 기반 <br/> 바이오의약품 제조 기술자 및 <br/>품질관리기술자 양성</h1></div>
        <div>
          <p className="text-xl text-muted-foreground leading-8">21세기는 유전체 서열 빅데이터를 분석하고 단백질체 구조를 인공지능 기술로 가상 모형화하는 디지털과 바이오 융합의 시대에 본격적으로 진입했다. AI・빅데이터를 기반으로
            한 바이오 기술과 디지털 기술의 융합을 통해 바이오산업 분양의 최첨단 디지털바이오 핵심 인력 양성을 위해 바이오 기업과 함께 하는 산학협력 프로젝트, 기업체 인턴십 프로그램
            등을 활용하여 실무 중심의 프로젝트 개발 능력을 갖춘 디지털바이오 융합인재 육성을 목표로 한다. 
          </p>
        </div>
      </div>

      {/* 이미지 */}
      <div className="custom-width grid grid-cols-2 gap-2">
        <div className="w-full h-[350px] overflow-hidden relative">
          <Image src={dhuImage} width={620} alt="대구한의대학교 이미지" className="object-cover object-center" />
          <p className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1">대구한의대학교 삼성캠퍼스</p>
        </div>
        <div className="w-full h-[350px] overflow-hidden relative">
          <Image src={meisterSchool} width={620} alt="대구한의대학교 이미지" className="object-cover object-center" />
          <p className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1">경북 바이오마이스터 고등학교 </p>
        </div>
      </div>
    </div>
  );
}
