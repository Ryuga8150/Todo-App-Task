import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormSubmissionPage from "./pages/FormSubmissionPage";
import { Toaster } from "sonner";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/createTask" element={<FormSubmissionPage />} />
          <Route path="/updateTask/:id" element={<FormSubmissionPage />} />
        </Route>
      </Routes>
      <Toaster
        richColors
        toastOptions={{
          classNames: { toast: "md:text-lg text-sm" },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
