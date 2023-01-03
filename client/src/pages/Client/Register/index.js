import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../../services/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!email?.trim()?.length || !password?.trim()?.length) {
        return toast.error("Email or Password can not blank");
      }

      if (password?.trim()?.length < 6) {
        return toast.error("Mật khẩu cần có ít nhất 6 kí tự");
      }

      if (password !== confirmPassword) {
        return toast.error("Confirm password does not match the password");
      }

      const registerResult = await userSignup(email, password);

      if (registerResult?.data?.success) {
        toast.success(
          "Successful account registration, you will be redirected to the login page in 2s"
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        return toast.error(registerResult?.data?.error || "Đăng kí thất bại");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Đăng kí thất bại");
    }
  };

  return (
    <div>
      <section
        className="breadcumb-area bg-img bg-overlay"
        style={{ backgroundImage: "url(img/bg-img/breadcumb3.jpg)" }}
      >
        <div className="bradcumbContent">
          <p>See what’s new</p>
          <h2>Sign Up</h2>
        </div>
      </section>
      <section className="login-area section-padding-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="login-content">
                <h3>Register an account</h3>
                <div className="login-form">
                  <form onSubmit={(event) => event.preventDefault()}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter E-mail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        <i className="fa fa-lock mr-2" />
                        We'll never share your email with anyone else.
                      </small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <small id="emailHelp" className="form-text text-muted">
                        Password needs at least 6 characters
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputPassword2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(event) =>
                          setConfirmPassword(event.target.value)
                        }
                      />
                    </div>

                    <div style={{ textAlign: "right" }}>
                      Do you already have an account? <a href="/login">Login</a>
                    </div>
                    <button
                      type="submit"
                      className="btn oneMusic-btn mt-30"
                      onClick={() => handleRegister()}
                    >
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
