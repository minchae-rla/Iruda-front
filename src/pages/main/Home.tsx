import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import MyCalendar from "../../components/MyCalendar";
import { TaskList } from "../../pages/taskList/TaskList";
import api from "../../config/api";

export const Home = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [viewMode, setViewMode] = useState<'calendar' | 'all' | 'today' | 'tomorrow' | 'completed'>('calendar');
  const [taskListTasks, setTaskListTasks] = useState([]);

  const fetchCalendarTasks = async (projectId: number) => {
    try {
      const response = await api.get(`/api/tasks/getAllTask/${projectId}`);
      setCalendarTasks(response.data);
    } catch (error) {
      console.error('캘린더 일정 불러오기 실패:', error);
    }
  };

  const fetchTaskListTasks = async (filter: typeof viewMode) => {
    if (filter === 'calendar') return;
    try {
      let url = '/api/tasks';
      if (filter === 'all') url = '/api/tasks/allTask';
      if (filter === 'today') url = '/api/tasks/todayTask';
      if (filter === 'tomorrow') url = '/api/tasks/tomorrowTask';
      if (filter === 'completed') url = '/api/tasks/completeTask';
      const response = await api.get(url);
      setTaskListTasks(response.data);
    } catch (error) {
      console.error('TaskList 일정 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    const fetchInitialProject = async () => {
      try {
        const response = await api.get('/api/projects/getProject');
        const projects = response.data;
        if (projects.length > 0) {
          setSelectedProjectId(projects[0].id);
          setViewMode('calendar');
          fetchCalendarTasks(projects[0].id);
        }
      } catch (error) {
        console.error('프로젝트 초기 선택 실패:', error);
      }
    };
    fetchInitialProject();
  }, []);

  useEffect(() => {
    if (selectedProjectId !== null && viewMode === 'calendar') {
      fetchCalendarTasks(selectedProjectId);
    }
  }, [selectedProjectId, viewMode]);

  useEffect(() => {
    if (viewMode !== 'calendar') {
      fetchTaskListTasks(viewMode);
    }
  }, [viewMode]);

  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar
          onProjectSelect={(id) => {
            setSelectedProjectId(id);
            setViewMode('calendar');
          }}
          onViewChange={setViewMode}
        />
        <main className="flex-1 overflow-auto p-4">
          {viewMode === 'calendar' && selectedProjectId && (
            <MyCalendar
              tasks={calendarTasks}
              projectId={selectedProjectId}
              onTaskAdded={() => fetchCalendarTasks(selectedProjectId)}
            />
          )}
          {viewMode !== 'calendar' && (
            <TaskList
              tasks={taskListTasks}
              filter={viewMode}
            />
          )}
        </main>
      </div>
    </div>
  );
};
