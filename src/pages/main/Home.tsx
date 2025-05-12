import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import MyCalendar from "../../components/MyCalendar";

export const Home = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-auto p-4">
          <MyCalendar />
        </main>
      </div>
    </div>
  );
};
