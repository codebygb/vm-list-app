import { Button, div, Paper, TextField } from "@material-ui/core";
import { useRef, useState } from "react";
import { supabase } from "./supabase";

const Auth = () => {
  const [helperText, setHelperText] = useState({ error: null, text: null });
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = async (type) => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const { user, error } =
      type === "LOGIN"
        ? await supabase.auth.signIn({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (error) {
      setHelperText({ error: true, text: error.message });
    } else if (!user && !error) {
      setHelperText({
        error: false,
        text: "An email has been sent to you for verification!",
      });
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <div className="input">
          <TextField
            fullWidth
            id="outlined-basic"
            label="email"
            variant="outlined"
            inputRef={emailRef}
          />
        </div>
        <div className="input">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            inputRef={passwordRef}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            onClick={() => handleLogin("LOGIN")}
            style={{ margin: "0.5em" }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleLogin("REGISTER").catch(console.error)}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
