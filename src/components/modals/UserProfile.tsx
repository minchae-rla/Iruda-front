import React, { useEffect, useState } from "react";
import api from "../../config/api";

interface Props {
  onClose: () => void;
}

interface User {
  name: string;
  userId: string;
  department: string;
  phone: string;
  birth: string;
}

const UserProfile: React.FC<Props> = ({ onClose }) => {
  const [user, setUser] = useState<User>({
    name: "",
    userId: "",
    department: "",
    phone: "",
    birth: ""
  });

  const [originalUser, setOriginalUser] = useState<User>({ ...user });
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/users/getUser");
        const fetchedUser: User = {
          name: res.data.name ?? "",
          userId: res.data.userId ?? "",
          department: res.data.department ?? "",
          phone: res.data.phone ?? "",
          birth: res.data.birth ?? ""
        };
        setUser(fetchedUser);
        setOriginalUser(fetchedUser);
      } catch (error) {
        console.error("회원정보 조회 실패:", error);
        alert("회원정보를 불러올 수 없습니다.");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {};
    if (user.name !== originalUser.name) payload.name = user.name;
    if (user.phone !== originalUser.phone) payload.phone = user.phone;
    if (user.department !== originalUser.department) payload.department = user.department;
    if (newPassword.trim() !== "") payload.userPw = newPassword;

    if (Object.keys(payload).length === 0) {
      alert("변경된 내용이 없습니다.");
      return;
    }

    try {
      console.log("보낼 payload:", payload);
      await api.put("/api/users/updateUser", payload);
      alert("회원정보가 성공적으로 수정되었습니다.");
      setOriginalUser({ ...user });
      setNewPassword("");
      onClose();
    } catch (error) {
      console.error("회원정보 수정 실패:", error);
      alert("회원정보 수정에 실패했습니다.");
    }
  };

  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("회원탈퇴 시 모든 정보가 삭제됩니다. 진행하시겠습니까?")) return;

    try {
      await api.delete("/api/users/deleteUser");
      alert("회원탈퇴가 완료되었습니다.");
      onClose();
      window.location.href = "http://localhost:5173";
    } catch (error) {
      console.error("회원탈퇴 실패:", error);
      alert("회원탈퇴에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg w-[600px] h-[400px] p-6 relative">
        <h2 className="text-xl font-bold mb-4 p-2">마이페이지</h2>
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-600 hover:text-black">✕</button>

        <form className="space-y-4 p-4" onSubmit={handleUpdateUser}>
          <div className="flex justify-between">
            <div>이름</div>
            <input type="text" value={user.name} onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))} className="border rounded-md px-2" />
          </div>
          <div className="flex justify-between">
            <div>아이디</div>
            <input type="text" value={user.userId} readOnly className="border rounded-md px-2 bg-gray-100" />
          </div>
          <div className="flex justify-between">
            <div>비밀번호</div>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="비밀번호 변경 시 입력" className="border rounded-md px-2" />
          </div>
          <div className="flex justify-between">
            <div>부서</div>
            <input type="text" value={user.department} onChange={e => setUser(prev => ({ ...prev, department: e.target.value }))} className="border rounded-md px-2" />
          </div>
          <div className="flex justify-between">
            <div>전화번호</div>
            <input type="text" value={user.phone} onChange={e => setUser(prev => ({ ...prev, phone: e.target.value }))} className="border rounded-md px-2" />
          </div>
          <div className="flex justify-between">
            <div>생년월일</div>
            <input type="text" value={user.birth} readOnly className="border rounded-md px-2 bg-gray-100" />
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-3 py-1">개인정보수정</button>
            <button type="button" onClick={handleDeleteUser} className="bg-red-500 text-white hover:bg-red-700 rounded-md px-3 py-1">회원탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
