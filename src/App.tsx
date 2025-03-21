import { Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <UserProvider>
      <Nav />
      <main>
        <Outlet />
      </main>
    </UserProvider>
  );
}

export default App;
