import { Outlet } from "react-router-dom";
import { NavBar } from '../../components';

export const MainLayout = () => {
  return (
    <>
      <header
        className="position-fixed w-100 top-0 left-0 z-50 bg-white"
      >
        <NavBar />
      </header>
      <main
        style={{
          height: "100%",
        }}
      >
        <Outlet />
      </main>
    </>
  );
};
