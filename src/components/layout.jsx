import { Outlet } from 'react-router-dom';
import Header from "./header";

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;