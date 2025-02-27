import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {                             // if email is empty
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // if email format is invalid
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {                          // if password is empty
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;        // return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login successful:", formData);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        background: "#fff",
      }}
    >
      <div
        className="p-4 w-100"
        style={{
          maxWidth: "420px",
          minWidth: "200px",
          background: "#fff",
          border: "none",
          boxShadow: "none",
        }}
      >
        <h2
          style={{
            fontFamily: "Laxend, sans-serif",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#696B71",
            textAlign: "left",
          }}
        >
          Selamat Datang di Fineksi
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold text-start d-block">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Masukkan email Anda"
              value={formData.email}
              onChange={handleChange}
              style={{ height: "45px", borderRadius: "6px" }}
            />
            {errors.email && <small className="text-danger text-start d-block">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold text-start d-block">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control pe-5"
                name="password"
                placeholder="Masukkan password Anda"
                value={formData.password}
                onChange={handleChange}
                style={{ height: "45px", borderRadius: "6px", paddingRight: "40px" }}
              />
              <button
                type="button"
                className="btn position-absolute end-0 top-50 translate-middle-y me-2"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="toggle password visibility"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                {showPassword ? <FaEyeSlash size={18} color="#555" /> : <FaEye size={18} color="#555" />}
              </button>
            </div>
            {errors.password && <small className="text-danger text-start d-block">{errors.password}</small>}
          </div>

          <button
            type="submit"
            className="w-100 py-2 fw-bold"
            style={{
              backgroundColor: "#2F52FD",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              transition: "background 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#2448E3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#2F52FD")}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

Login.displayName = "Login";
export default Login;