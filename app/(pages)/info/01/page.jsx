"use client";

import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import { events } from "@/lib/events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import LocalMenus from "@/app/components/LocalMenus";

moment.locale("ko-KR");
const localizer = momentLocalizer(moment);

export default function page() {
  return (
    <>
      <LocalMenus firstLocal="과정안내" secondLocal="수업일정" />
      <div className="custom-width flex flex-col gap-y-5">
        <div className="flex flex-col text-center gap-2 mb-8">
          <h1 className="text-3xl font-bold text-center">수업일정</h1>
          <p className="text-sm text-muted-foreground">
            미래유망분야 경북 바이오 마이스터 고등학교 수업일정을 확인하세요!
          </p>
        </div>
        <div className="w-full h-[800px] m-2">
          <BigCalendar
            selectable
            localizer={localizer}
            events={events}
            defaultView={Views.MONTH}
            views={[Views.DAY, Views.WEEK, Views.MONTH]}
            steps={60}
            defaultDate={new Date(Date.now())}
          />
        </div>
      </div>
    </>
  );
}
