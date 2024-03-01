import "./Formstyle.css";
import AccountCircleIcon from '@mui/styled-engine/GlobalStyles/GlobalStyles';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Validation by schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ !!!")
    .required("Vui lòng nhập email !!!"),
  password: yup.string().required("Vui lòng nhập mật khẩu."),
});

// Lay API
const API_URL = "http://localhost:3001/account_users";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  // Xu ly voi json account_users bang axios
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await axios.get(
        `${API_URL}?email=${data.email}&password=${data.password}`
      );
      const users = response.data;

      if (users.length > 0) {
        console.log("Đăng nhập thành công!");
        console.log(response.data);
        alert(`Xin chào ${data.email}`);
        navigate("/home");
      } else {
        alert("Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi đăng nhập!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="body">
          <div className="Login-page">
            <div className="main">
              <div className="top">
                <AccountCircleIcon styles={undefined}/>
                <h1>Sign in</h1>
              </div>
              <div className="middle">
                <div className="middle-top">
                  <div className="mdl-input_top">
                    <input
                      className="input_top"
                      type="text"
                      placeholder=" "
                      {...register("email")}
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                    <label className="label-input_top">Email Address *</label>
                  </div>
                  <input
                    className="input_bottom"
                    type="password"
                    placeholder="Password *"
                    {...register("password")}
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                  {/* input for checkbox */}
                  <label className="mdl-top-label">
                    <input type="checkbox" className="mdl-top-label_checkbox" />{" "}
                    Remember me
                  </label>
                </div>

                <div className="middle-bottom">
                  {/* button sign in */}
                  <button className="mdl-btm_summit">SIGN IN</button>
                  <div className="mdl-btm_bottom">
                    <a
                      className="mdl-btm_btm_a"
                      href="../register/register.jsx"
                    >
                      Forgot Password?
                    </a>
                    <a className="mdl-btm_btm_a" href="">
                      Don't have account? Sign Up
                    </a>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="bt-main">
                  <span>
                    Copyright @ <u>Your Website</u> 2023
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
