import styled, { ThemeProvider } from 'styled-components/macro';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import Login from './pages/login';
import SignUp from './pages/signup';
import { ProvideAuth } from './custom-hooks/useAuth';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Container>
          <ProvideAuth>
            {<Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>}
          </ProvideAuth>
        </Container>
      </ThemeProvider>
  );
}

export default App;
