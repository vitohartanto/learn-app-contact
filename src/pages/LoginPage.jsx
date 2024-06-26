import { login } from "../utils/api";
import LoginInput from "../components/LoginInput";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LoginPage = ({ loginSuccess }) => {
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className="login-page">
      <h2>Silahkan masuk untuk melanjutkan...</h2>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun? <Link to="/register">Daftar disini.</Link>
      </p>
    </section>
  );
};

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
