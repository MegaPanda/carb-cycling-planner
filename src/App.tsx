import styled, { ThemeProvider } from 'styled-components/macro';
import { Routes, Route } from 'react-router-dom';
import theme, { GlobalStyle } from './theme';
import Login from './pages/login';
import SignUp from './pages/signup';
import Home from './pages/home';
import AuthRoute from './router/authRoute';
import Dashboard from './pages/dashboard';
import PublicRoute from './router/publicRoute';
import Setting from './pages/setting';
import Diary from './pages/diary';
import FoodItemDetails from './pages/foodDetails';
import FoodSearch from './pages/foodSearch';
import { ProvideFood } from './custom-hooks/useFood';
import useAppSelector from './custom-hooks/useAppSelector';
import Setup from './pages/setup';
import CreateFood from './pages/createFood';

const Container = styled.div`
    position: relative;
    margin: auto;
    min-height: 100vh;
    overflow: auto;
    max-width: 480px;
    border: 2px solid;
`;

function App() {
  const user = useAppSelector(state => state.user);

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container id="app">
          <Routes>
            <Route path="/" element={
                                  <PublicRoute>
                                    <Home uid={user.uid} /> 
                                  </PublicRoute>  
            } />
            <Route path="login" element={
                                  <PublicRoute>  
                                    <Login />
                                  </PublicRoute>
            } />
            <Route path="signup" element={
                                  <PublicRoute>
                                    <SignUp />
                                  </PublicRoute>
            } />
              <Route path="user" element={
                                  <ProvideFood>
                                    <AuthRoute uid={user.uid} />
                                  </ProvideFood>
            } >
                <Route path="" element={<Dashboard user={user} />} />
                <Route path="setup" element={<Setup user={user} />} />
                <Route path="dashboard" element={<Dashboard user={user} />} />
                <Route path="diary" element={<Diary user={user} />} />
                <Route path="setting" element={<Setting user={user} />} />
                <Route path="foodDetails" element={<FoodItemDetails uid={user.uid} />} />
                <Route path="foodSearch" element={<FoodSearch diary={user.diary} />} />
                <Route path="createFood" element={<CreateFood uid={user.uid} />} />
              </Route>
          </Routes>
        </Container>
      </ThemeProvider>
  );
}

export default App;
