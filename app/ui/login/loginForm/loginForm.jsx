"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Нэвтрэх</h1>
      <input type="text" placeholder="И-мэйл" name="username" />
      <input type="password" placeholder="Нууц үг" name="password" />
      <button>Нэвтрэх</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
