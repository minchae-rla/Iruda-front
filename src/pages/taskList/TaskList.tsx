import React from 'react';

interface Task {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'today' | 'tomorrow' | 'completed';
}

export const TaskList = ({ tasks, filter }: TaskListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">
        {filter === 'all' && '전체 일정'}
        {filter === 'today' && '오늘'}
        {filter === 'tomorrow' && '내일'}
        {filter === 'completed' && '완료된 일정'}
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-sm">일정이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-3 rounded hover:bg-gray-50">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(task.startDate).toLocaleDateString()} ~ {new Date(task.endDate).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
