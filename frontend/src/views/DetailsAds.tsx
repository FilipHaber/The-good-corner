import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AdCardProps } from "../components/AdCard";

const DetailsAds = () => {
  const { id } = useParams();
  const [data, setData] = useState<AdCardProps>();
  const navigate = useNavigate();

  const deleteAd = async (id: number) => {
    try {
      const result = await axios.delete(`http://localhost:3000/ad/${id}`);
      console.log("result :", result);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ad/${id}`);
        console.log("data :", result);
        console.log("id :", id);
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <section>
      <h1>{data?.title}</h1>
      <article>
        <h2>Propriétaire de l'annonce : {data?.owner}</h2>
        <img src={`../../public/images/${data?.picture}`} alt="" />
        <p>
          Description : <br />
          {data?.description}
        </p>
        <p>Prix : {data?.price}</p>
        <p>
          Date de publication :{" "}
          {new Date(data?.createdAt as string).toLocaleDateString()}
        </p>
        <button
          onClick={() => {
            deleteAd(Number(id));
          }}
        >
          Supprimer l'annonce
        </button>
        <Link className="button" to="http://localhost:5173/">
          Revenir sur la page d'acceuil
        </Link>
        <Link
          className="button"
          to={`http://localhost:5173/ad/edit/${data?.id}`}
        >
          Editer l'annonce
        </Link>
      </article>
    </section>
  );
};
export default DetailsAds;
