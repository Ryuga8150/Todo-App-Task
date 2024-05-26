import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="mx-auto min-h-screen bg-gray-950 lg:container">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="container max-w-4xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
