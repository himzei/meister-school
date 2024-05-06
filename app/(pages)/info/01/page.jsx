"use client";

import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
} from "react-big-calendar";
import { events } from "@/lib/events";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ko-KR");
const localizer = momentLocalizer(moment);

export default function page() {
  return (
    <div className="custom-width flex flex-col gap-y-5">
      <h1 className="text-3xl font-bold text-center">수업일정</h1>
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
  );
}
