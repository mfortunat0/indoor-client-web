import { useNavigate } from "react-router-dom";
import style from "./index.module.css";
import { FormEvent } from "react";

export function Login() {
  const navigate = useNavigate();

  return (
    <main className={style.loginContainer}>
      <form onSubmit={(event: FormEvent) => event.preventDefault()}>
        <h2>Bem Vindo</h2>
        <div>
          <input id="email" type="email" placeholder="Digite seu email" />
        </div>
        <div>
          <input
            id="password"
            type="password"
            placeholder="Digite seu password"
          />
        </div>
        <button onClick={() => navigate("/home")}>Entrar</button>
      </form>
    </main>
  );
}
