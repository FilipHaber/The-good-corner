import { AdCard, AdCardProps } from "./AdCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<AdCardProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get<AdCardProps[]>(
          "http://localhost:3000/ads"
        );
        setAds(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              id={ad.id}
              picture={`../../public/images/${ad.picture}`}
              link={ad.link}
              price={ad.price}
              title={ad.title}
              category={ad.category}
            />
            <button
              className="button"
              onClick={() => {
                setTotal(total + ad.price);
              }}
            >
              Add price to total
            </button>
            <Link className="button" to={`http://localhost:5173/ad/${ad.id}`}>
              Voir détail
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;
