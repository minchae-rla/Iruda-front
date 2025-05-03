import { Header } from "../../component/Header"
import { SideBar } from "../../component/SideBar"
import { Calendar } from "../../component/Calendar"

export const Home = () => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SideBar />
        <main className="flex-1 overflow-auto p-4">
          <Calendar />
        </main>
      </div>
    </div>
  )
}