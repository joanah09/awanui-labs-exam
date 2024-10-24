import Index from ".";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CentreListInfo from "./components/CentreListInfo";
import { LoadScript } from "@react-google-maps/api";

function App() {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/:slug" element={<CentreListInfo />} />
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;
