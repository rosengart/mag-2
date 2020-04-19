import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

function LoginDialog(props) {
  const auth = props.authProvider;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit() {
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      console.log("handleSubmitError", error);
    });
  }

  return (
    <Dialog open={true}>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          // autoFocus
          label="Email"
          type="email"
          name="email"
          fullWidth
          value={email}
          onChange={handleEmail}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Senha"
          type="password"
          name="password"
          fullWidth
          value={password}
          onChange={handlePassword}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleSubmit()} color="primary">
          Entrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Login() {
  return <LoginDialog authProvider={this.props.authProvider} />;
}
