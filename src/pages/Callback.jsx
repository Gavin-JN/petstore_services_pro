import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Callback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      const cacheKey = code + state;
      if (sessionStorage.getItem("oauth_processed") === cacheKey) return;
      sessionStorage.setItem("oauth_processed", cacheKey);

      axios
        .get(" /api/oauth/callback", { params: { code, state } })
        .then(res => {
          const { token, user } = res.data;
          if (token) {
            
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("ifLogin", true);
            localStorage.setItem("tips", user.cartItemNum || 0);
            navigate("/main");
          } else {
            alert("登录失败：" + (res.data.error || "未知错误"));
            navigate("/login");
          }
        })
        .catch(err => {
          alert("登录失败，请检查网络或后端状态");
          console.error(err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h3>登录中，请稍候...</h3>
      <div className="spinner" />
    </div>
  );
}

export default Callback;
