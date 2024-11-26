import { Box, Button, Container, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from "../../hooks/useDebounce";
import apiService from '../../services/api';
import { useNavigate } from 'react-router';


export const Login = () => {
  const [toggleRegister, setToggleRegister] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("");
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
    } catch (error) {
      console.log(error)
    }
  };

  const handleLogin = async () => {
    try {
      const response = await apiService.login(email, password);
      localStorage.setItem("userToken", response.data.token);
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
    >
      <Container maxWidth="sm" style={{ border: "solid 1px", flexDirection: "column", display: "flex", justifyContent: "center", padding: "20px", }}>
        <h1 style={{ textAlign: "center" }}>
          {toggleRegister ? "Sign in" : "Sign up"}
        </h1>


        {toggleRegister ? (<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <TextField label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
          <TextField type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
          <Button style={{ width: "50%", margin: "0 auto" }} variant="contained" onClick={() => handleLogin()}>Sign in</Button>
          <div>
            <h3>Don't have an account? <Button onClick={() => toggleLogin()} size='small'>Register here</Button></h3>
          </div>
        </div>) :

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField label="E-mail" variant="outlined" onChange={(e) => setEmail(e.target.value)} value={email} />
            <TextField type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} value={password} />
            <TextField type='password' label="Confirm password" variant="outlined" onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              error={Boolean(error)}
              helperText={error} />
            <Button style={{ width: "50%", margin: "0 auto" }} disabled={(Boolean(error))} onClick={() => handleRegister()} variant="contained">Sign up</Button>
            <div>
              <h3>Already have an account? <Button onClick={() => toggleLogin()} size='small'>Login here</Button></h3>
            </div>
          </div>}

      </Container>
    </Box >
  )
}