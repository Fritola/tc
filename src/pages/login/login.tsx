/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Snackbar, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useDebounce from "../../hooks/useDebounce";
import apiService from '../../services/api';
import { Container, FormContainer, StyledBox } from './login-styled';

export const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
  const [toastOpen, setToastOpen] = useState({ open: false, message: "" })
  const navigate = useNavigate()

  const toggleLogin = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setToggleRegister(!toggleRegister)
  }

  const debouncedConfirmPassword = useDebounce(confirmPassword, 5);

  useEffect(() => {
    if (debouncedConfirmPassword && password !== debouncedConfirmPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  }, [password, debouncedConfirmPassword]);


  const handleRegister = async () => {
    try {
      const response = await apiService.register(email, password);
      localStorage.setItem("userToken", response.data.token)
      navigate("/dashboard")
    } catch (error: any) {
      setToastOpen({ open: true, message: error.response.data.error })
    }
  };

  const handleLogin = async () => {
    try {
      const response = await apiService.login(email, password);
      localStorage.setItem("userToken", response.data.token);
      navigate("/dashboard")
    } catch (error: any) {
      setToastOpen({ open: true, message: error.response.data.error })
    }
  };

  return (
    <StyledBox>
      <Container maxWidth="sm">

        <Typography variant='h3' style={{ textAlign: "center" }}>
          {toggleRegister ? "Sign in" : "Sign up"}
        </Typography>

        <FormContainer>
          {toggleRegister ?
            <>
              <TextField label="E-mail" id="email-input" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
              <TextField type='password' data-testid="password-input" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
              <Button style={{ width: "50%", margin: "0 auto" }} id="sign-button" variant="contained" onClick={() => handleLogin()}>Sign in</Button>
              <div>
                <Typography variant='h6'>Don't have an account? <Button onClick={() => toggleLogin()} size='small'> Register here</Button> </Typography>
              </div>
            </>
            :
            <>
              <TextField label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
              <TextField type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
              <TextField type='password' label="Confirm password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                error={Boolean(error)}
                helperText={error} />
              <Button style={{ width: "50%", margin: "0 auto" }} disabled={(Boolean(error))} onClick={() => handleRegister()} variant="contained">Sign up</Button>
              <div>
                <Typography variant='h6'>Already have an account? <Button onClick={() => toggleLogin()} size='small'>Login here</Button></Typography>
              </div>
            </>}
        </FormContainer>

        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={toastOpen.open}
          onClose={() => setToastOpen({ open: false, message: "" })}
          autoHideDuration={5000}
          message={toastOpen.message}
        />
      </Container>
    </StyledBox >
  )
}