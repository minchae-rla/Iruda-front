import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import MyCalendar from "../../components/MyCalendar";
import api from "../../config/api";

export const Home = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    if (selectedProjectId === null) return console.log('프로젝트아이디 없음');

    try {
      const response = await api.get(`/api/tasks/getAllTask/${selectedProjectId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('일정조회 실패 :', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [selectedProjectId]);

  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar onProjectSelect={setSelectedProjectId} />
        <main className="flex-1 overflow-auto p-4">
          <MyCalendar tasks={tasks} />
        </main>
      </div>
    </div>
  );
};
