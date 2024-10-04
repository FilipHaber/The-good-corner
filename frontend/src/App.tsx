import { Route, Routes } from "react-router-dom";
import RecentAds from "./components/RecentAds";
import Layout from "./views/Layout";
import About from "./views/About";
import DetailsAds from "./views/DetailsAds";
import NewAd from "./views/NewAd";
import AdsByCategory from "./views/AdsByCategory";
import EditAd from "./views/EditAd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/new" element={<NewAd />} />
        <Route path="ad/:id" element={<DetailsAds />} />
        <Route path="ad/category/:keyword" element={<AdsByCategory />} />
        <Route path="ad/edit/:id" element={<EditAd />} />
      </Route>
    </Routes>
  );
}

export default App;
