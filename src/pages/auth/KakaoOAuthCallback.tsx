import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function KakaoOAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      // 토큰 저장 (로컬스토리지 또는 쿠키)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 홈 또는 원하는 페이지로 이동
      navigate("/home");
    } else {
      alert("로그인 실패");
      navigate("/login");
    }
  }, []);

  return <p>로그인 중입니다...</p>;
}

export default KakaoOAuthCallback;
