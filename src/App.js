import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Avatar, Fade, IconButton, InputAdornment, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './App.css';

// Login Page Component
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowCard(true);
  }, []);

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) return;

    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Optionally store rememberMe in localStorage
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('email', email);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('email');
      }
      navigate('/dashboard');
    }, 1200);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Password reset link would be sent to your email.');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  return (
    <>
      {/* Top Left Brand with Logo */}
      <Box
        sx={{
          position: 'absolute',
          top: 24,
          left: 32,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <img
          src="/logo.png"
          alt="Kartooayo Logo"
          style={{ height: 48, marginRight: 16 }}
        />
        <Typography
          variant="h5"
          sx={{
            color: '#FFD700',
            fontWeight: 'bold',
            letterSpacing: 2,
            fontFamily: 'Montserrat, sans-serif',
            fontStyle: 'italic'
          }}
        >
          KARTOOAYO
        </Typography>
      </Box>
      {/* Centered Login Card with Blue Background */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#191970',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        <Fade in={showCard} timeout={900}>
          <Paper
            elevation={6}
            className="fade-in"
            sx={{
              p: 4,
              bgcolor: '#23235b',
              borderRadius: 4,
              width: '100%',
              maxWidth: { xs: 320, sm: 400, md: 420 },
              boxShadow: '0 4px 16px rgba(25, 25, 112, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ bgcolor: '#FFD700', mb: 2 }}>
              <LockOutlinedIcon sx={{ color: '#191970' }} />
            </Avatar>
            <Typography
              variant="h4"
              sx={{
                color: '#FFD700',
                fontWeight: 'bold',
                fontFamily: 'Montserrat, sans-serif'
              }}
              gutterBottom
            >
              Login
            </Typography>
            <form className="w-full" onSubmit={handleLogin} noValidate>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!emailError}
                helperText={emailError}
                InputProps={{
                  style: {
                    backgroundColor: '#23235b',
                    color: '#FFD700',
                    fontFamily: 'Montserrat, sans-serif'
                  }
                }}
                InputLabelProps={{
                  style: { color: '#FFD700', fontFamily: 'Montserrat, sans-serif' }
                }}
                inputProps={{
                  'aria-label': 'email'
                }}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  style: {
                    backgroundColor: '#23235b',
                    color: '#FFD700',
                    fontFamily: 'Montserrat, sans-serif'
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        sx={{ color: '#FFD700' }}
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                InputLabelProps={{
                  style: { color: '#FFD700', fontFamily: 'Montserrat, sans-serif' }
                }}
                inputProps={{
                  'aria-label': 'password'
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{ color: '#FFD700' }}
                    inputProps={{ 'aria-label': 'remember me' }}
                  />
                }
                label={<span style={{ color: '#FFD700' }}>Remember me</span>}
                sx={{ width: '100%', mt: 1, mb: 1 }}
              />
              {error && (
                <Typography sx={{ color: 'red', fontSize: '0.95rem', mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 2,
                  bgcolor: '#FFD700',
                  color: '#191970',
                  fontWeight: 'bold',
                  fontFamily: 'Montserrat, sans-serif',
                  '&:hover': {
                    bgcolor: '#e6c200',
                  },
                }}
                aria-label="login"
              >
                {loading ? <CircularProgress size={24} sx={{ color: '#191970' }} /> : 'Login'}
              </Button>
              <Box sx={{ textAlign: 'right' }}>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="forgot-password-link"
                >
                  Forgot password?
                </a>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <a
                  href="#"
                  onClick={handleSignUp}
                  className="sign-up-link"
                >
                  Don&apos;t have an account? Sign up
                </a>
              </Box>
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <a href="/terms" style={{ color: '#FFD700', marginRight: 16 }}>Terms of Service</a>
                <a href="/privacy" style={{ color: '#FFD700' }}>Privacy Policy</a>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Box>
      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          bgcolor: '#23235b',
          color: '#FFD700',
          textAlign: 'center',
          py: 1,
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '0.95rem'
        }}
      >
        © {new Date().getFullYear()} KARTOOAYO. All rights reserved.
      </Box>
    </>
  );
}

// Dashboard Page Component
function Dashboard() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#191970',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <Avatar sx={{ bgcolor: '#FFD700', width: 72, height: 72, mb: 2 }}>
        <LockOutlinedIcon sx={{ color: '#191970', fontSize: 40 }} />
      </Avatar>
      <Typography variant="h3" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 2 }}>
        Welcome to the Dashboard!
      </Typography>
      <Typography variant="body1" sx={{ color: '#fff', mb: 4 }}>
        You are now logged in.
      </Typography>
      <Button
        variant="contained"
        sx={{
          bgcolor: '#FFD700',
          color: '#191970',
          fontWeight: 'bold',
          fontFamily: 'Montserrat, sans-serif',
          '&:hover': {
            bgcolor: '#e6c200',
          },
        }}
        onClick={() => window.location.href = '/'}
      >
        Log out
      </Button>
    </Box>
  );
}

// Sign Up Page Component (with password strength meter)
function SignUpPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (pwd.length > 8 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) return 'Strong';
    if (pwd.length > 5) return 'Medium';
    return 'Weak';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#191970',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat, sans-serif'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          bgcolor: '#23235b',
          borderRadius: 4,
          width: '100%',
          maxWidth: { xs: 320, sm: 400, md: 420 },
          boxShadow: '0 4px 16px rgba(25, 25, 112, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#FFD700',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            mb: 2
          }}
        >
          Sign Up
        </Typography>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              backgroundColor: '#23235b',
              color: '#FFD700',
              fontFamily: 'Montserrat, sans-serif'
            }
          }}
          InputLabelProps={{
            style: { color: '#FFD700', fontFamily: 'Montserrat, sans-serif' }
          }}
        />
        <Typography sx={{ color: getPasswordStrength(password) === 'Strong' ? 'green' : getPasswordStrength(password) === 'Medium' ? 'orange' : 'red', fontSize: '0.9rem', mb: 2 }}>
          {password && `Strength: ${getPasswordStrength(password)}`}
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: '#FFD700',
            color: '#191970',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            '&:hover': {
              bgcolor: '#e6c200',
            },
          }}
          onClick={() => navigate('/')}
        >
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}

// Custom 404 Page
function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#191970', color: '#FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h2">404</Typography>
      <Typography variant="h5">Page Not Found</Typography>
      <Button variant="contained" sx={{ mt: 2, bgcolor: '#FFD700', color: '#191970' }} onClick={() => window.location.href = '/'}>Go Home</Button>
    </Box>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;