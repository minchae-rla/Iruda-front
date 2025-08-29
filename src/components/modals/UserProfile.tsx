import React, { useEffect, useState } from "react";
import api from "../../config/api";

interface Props {
  onClose: () => void;
}

interface User {
  name: string;
  userId: string;
  password?: string;
  department?: string;
  phone?: string;
}

const UserProfile: React.FC<Props> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // 마이페이지 열릴 때 회원정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/getUser");
        setUser(res.data);
      } catch (error) {
        console.error("회원정보 조회 실패:", error);
        alert("회원정보를 불러올 수 없습니다.");
      }
    };

    fetchUser();
  }, []);

  const handleDeleteuser = async () => {
    if (!window.confirm("회원탈퇴 시 모든 정보가 삭제되며 복구할 수 없습니다. 진행하시겠습니까?")) return;
    try {
      await api.post("/api/users/deleteUser");
      alert("회원탈퇴가 완료되었습니다.");
      onClose();
      window.location.href = "http://localhost:5173";
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패하였습니다.");
    }
  };

  const handleSave = async () => {
    try {
      await api.put("/api/users/updateUser", user); // 👉 백엔드에 맞는 URL/DTO 필요
      alert("회원정보가 수정되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정에 실패하였습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-[700px] h-[500px] p-6 relative">
        <h2 className="text-xl font-bold mb-4">마이페이지</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        {user ? (
          <div className="space-y-4">
            {/* 이름 */}
            <div>
              <label className="block text-sm font-medium text-gray-600">이름</label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-1">{user.name}</p>
              )}
            </div>

            {/* 아이디 (readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-600">아이디</label>
              <p className="mt-1 text-gray-500">{user.userId}</p>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-600">비밀번호</label>
              {isEditing ? (
                <input
                  type="password"
                  placeholder="변경할 비밀번호 입력"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-1">********</p>
              )}
            </div>

            {/* 소속 */}
            <div>
              <label className="block text-sm font-medium text-gray-600">소속</label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.department ?? ""}
                  onChange={(e) => setUser({ ...user, department: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-1">{user.department ?? "-"}</p>
              )}
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-600">전화번호</label>
              {isEditing ? (
                <input
                  type="text"
                  value={user.phone ?? ""}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="mt-1 w-full border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-1">{user.phone ?? "-"}</p>
              )}
            </div>

            {/* 버튼들 */}
            <div className="flex justify-between mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    저장
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    취소
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500"
                >
                  수정하기
                </button>
              )}

              <button
                onClick={handleDeleteuser}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                회원탈퇴
              </button>
            </div>
          </div>
        ) : (
          <p>회원정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
