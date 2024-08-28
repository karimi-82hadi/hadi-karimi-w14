import { Navigate, Route, Routes } from "react-router-dom";

import ContactsPage from "./pages/ContactsPage";
import ContactPage from "./pages/ContactPage";
import NewContactPage from "./pages/NewContactPage";
import PageNotFound from "./pages/404";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/contacts" replace />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contacts/:id" element={<ContactPage />} />
      <Route path="/new" element={<NewContactPage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
