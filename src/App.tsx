import styled, { ThemeProvider } from 'styled-components/macro';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import Login from './pages/login';
import SignUp from './pages/signup';
import { ProvideAuth } from './custom-hooks/useAuth';
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

const Container = styled.div`
    position: relative;
    margin: auto;
    min-height: 100vh;
    overflow: auto;
    max-width: 480px;
    border: 2px solid;
`;

function App() {
  const userData = useAppSelector(state => state.user);

  return (
      <ThemeProvider theme={theme}>
        <Container>
          <ProvideAuth>
            <Routes>
              <Route path="/" element={<Home />} />
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
                                      <AuthRoute />
                                    </ProvideFood>
              } >
                  <Route path="" element={<Dashboard userData={userData} />} />
                  <Route path="setup" element={<Setup />} />
                  <Route path="dashboard" element={<Dashboard userData={userData} />} />
                  <Route path="diary" element={<Diary />} />
                  <Route path="setting" element={<Setting userData={userData} />} />
                  <Route path="foodDetails" element={<FoodItemDetails />} />
                  <Route path="foodSearch" element={<FoodSearch userDiary={userData.diary} />} />
                </Route>
            </Routes>
          </ProvideAuth>
        </Container>
      </ThemeProvider>
  );
}

export default App;
