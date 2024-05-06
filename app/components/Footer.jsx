import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="w-full border-t border-neutral-300 bg-muted ">
      <div className="max-w-screen-xl w-full mx-auto grid grid-cols-[1fr_1fr_1fr_2fr] py-8 px-4 gap-8  h-[200px]">
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-primary font-semibold">개인정보처리방침</p>
          <p>이용약관</p>
          <p>이메일무단수집거부</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-primary font-semibold">로그인</p>
          <p>회원가입</p>
          <p>오시는길</p>
        </div>
        <div className="flex flex-col gap-2">
          <Logo />
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p>경상북도 영천시 신녕면 찰방길 8 경북바이오마이스터고등학교</p>
          <p>경상북도 경산시 어봉지길 285-10 대구한의대학교 산학협력단</p>
          <p>Copyright ⓒ 2024 (사)한국산업인재육성협회. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}
