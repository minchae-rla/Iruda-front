import React, { useEffect, useState } from "react";
import api from "../../config/api";

interface Props {
  onClose: () => void;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  alarmSet: string;
  color: string;
  read?: boolean;
  readAlarm?: boolean;
  createDate?: string; // 서버에서 내려주는 생성일
}

const AlarmMenu: React.FC<Props> = ({ onClose, setUnreadCount }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const res = await api.get("/api/tasks/alarm");
        const alarms: Task[] = res.data ?? [];

        // 1. 읽지 않은 알람 위, 읽은 알람 아래
        // 2. 같은 그룹 내에서는 최신 생성순
        const sortedAlarms = alarms
          .sort((a, b) => {
            const aRead = a.readAlarm ?? false;
            const bRead = b.readAlarm ?? false;

            if (aRead !== bRead) return aRead ? 1 : -1; // false 위, true 아래

            // 같은 read 상태면 createDate 기준 최신순
            return new Date(b.createDate || b.endDate).getTime() - new Date(a.createDate || a.endDate).getTime();
          })
          .map((a) => ({
            ...a,
            read: a.readAlarm ?? false,
          }));

        setTasks(sortedAlarms);

        // 읽지 않은 알람이 하나라도 있으면 빨간점 표시
        const unread = sortedAlarms.some(
          (a) => a.alarmSet?.toLowerCase().trim() === "on" && a.readAlarm === false
        );
        setUnreadCount(unread ? 1 : 0);
      } catch (error) {
        console.error("알람 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarms();
  }, [setUnreadCount]);

  const handleClose = async () => {
    try {
      const unreadTaskIds = tasks.filter((t) => !t.read).map((t) => t.id);
      if (unreadTaskIds.length > 0) {
        await api.put("/api/tasks/readAlarm", unreadTaskIds);
      }

      setTasks((prev) => prev.map((t) => ({ ...t, read: true })));
      setUnreadCount(0);
      onClose();
    } catch (error) {
      console.error("알람 읽음 처리 실패:", error);
      onClose();
    }
  };

  const calculateTimeAgo = (endDate: string) => {
    const date = new Date(endDate);
    const diff = Date.now() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}일 전`;
    return `${Math.floor(days / 7)}주 전`;
  };

  return (
    <div className="absolute right-0 top-16 w-80 bg-white rounded-xl shadow-lg border z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center px-4 py-2 border-b">
        <h2 className="font-bold text-lg">오늘 일정 알람</h2>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-black"
        >
          ✕
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {loading ? (
          <p className="p-4 text-gray-500">불러오는 중...</p>
        ) : tasks.length === 0 ? (
          <p className="p-4 text-gray-500">오늘 알람이 없습니다.</p>
        ) : (
          tasks
            .slice(0, 10) // 최대 10개만 표시
            .map((task) => (
              <div
                key={task.id}
                className={`p-3 border-b last:border-none hover:bg-gray-50 text-left ${
                  task.read ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span
                    className={`font-semibold truncate ${
                      task.read ? "text-gray-500" : "text-black"
                    }`}
                    title={task.title}
                  >
                    {task.title}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: task.color }}
                  />
                </div>

                <p
                  className={`text-sm truncate ${
                    task.read ? "text-gray-400" : "text-gray-600"
                  }`}
                  title={task.content}
                >
                  {task.content.length > 50
                    ? task.content.slice(0, 50) + "..."
                    : task.content}
                </p>

                <small className="text-xs text-gray-400 mt-1 block">
                  {calculateTimeAgo(task.endDate)}
                </small>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default AlarmMenu;
