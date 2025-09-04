import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./modals/ProfileMenu";
import AlarmMenu from "./modals/AlarmMenu";
import api from "../config/api";

export const Header = () => {
  const navigate = useNavigate();
  const [showAlarm, setShowAlarm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // 페이지 로드 및 새로고침 시 항상 알람 조회
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const res = await api.get("/api/tasks/alarm");
        const alarms = res.data ?? [];

        // 읽지 않은 알람이 하나라도 있으면 빨간점 표시
        const unread = alarms.some(
          (a: any) => a.alarmSet === "on" && a.readAlarm === false
        );

        setUnreadCount(unread ? 1 : 0); // 1이면 빨간점 표시, 없으면 0
      } catch (error) {
        console.error("알람 조회 실패:", error);
      }
    };

    fetchAlarms();
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b px-4 relative">
      <div>
        <a href="/home" className="text-blue-800 hover:underline">
          <img src="/img/logo.jpg" className="w-12 h-auto" />
        </a>
      </div>

      <div className="flex gap-5 items-center relative">
        <button
          className="relative"
          onClick={() => setShowAlarm((prev) => !prev)}
        >
          <img src="/img/bell.png" className="w-10 h-auto" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
          )}
        </button>

        {showAlarm && (
          <AlarmMenu
            onClose={() => setShowAlarm(false)}
            setUnreadCount={setUnreadCount}
          />
        )}

        <ProfileMenu />
      </div>
    </header>
  );
};
