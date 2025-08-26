import React, { useState, useRef, useEffect } from "react";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 로그아웃
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    window.location.href = "/login";
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* 아이콘 대신 프로필 사진 넣을 예정 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center"
      >
        😀
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl p-2">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <p className="font-semibold">사용자 이름</p>
            <p className="text-xs text-gray-500">user@email.com</p>
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
