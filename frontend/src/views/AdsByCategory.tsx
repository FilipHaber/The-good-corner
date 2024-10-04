import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AdCard, AdCardProps } from "../components/AdCard";

const AdsByCategory = () => {
  const { keyword } = useParams();
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchAdsForCategory = async () => {
      const result = await axios.get(
        `http://localhost:3000/ads/category/${keyword}`
      );
      setAds(result.data);
    };
    fetchAdsForCategory();
  }, [keyword]);
  return (
    <div>
      <h2>Search results for category: {keyword}</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div>
            <div key={ad.id}>
              <AdCard
                id={ad.id}
                title={ad.title}
                picture={`../../public/images/${ad.picture}`}
                price={ad.price}
                category={ad.category}
                link={""}
              />
            </div>
            <Link className="button" to={`http://localhost:5173/ad/${ad.id}`}>
              Voir détail
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AdsByCategory;
