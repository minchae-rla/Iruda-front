import React, { useState, useRef, useEffect } from "react";
import api from '../../config/api';

interface UserMinimal {
  name: string;
  userId: string;
}

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserMinimal | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<UserMinimal>("/api/users/getMinimal");
        if (res.data) {
          setUser({
            name: res.data.name,
            userId: res.data.userId,
          });
        }
      } catch (err) {
        console.error("사용자 정보 조회 실패:", err);
      }
    };

    if (isOpen && !user) fetchUser();
  }, [isOpen, user]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/login";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
      >
        <img src="/img/user_black.png" className="w-10 h-auto" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <p className="font-semibold">{user?.name || ""}</p>
            <p className="text-xs text-gray-500">{user?.userId || ""}</p>
          </div>
          <button
            onClick={() => alert("마이페이지 이동")}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
          >
            마이페이지
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 rounded-lg"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
