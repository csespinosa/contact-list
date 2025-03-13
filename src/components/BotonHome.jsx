import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddContact.css";

const Home = () => {
    const navigate = useNavigate();
    const { slug } = useParams(); // Obtiene el slug de la URL

    return (
        <button className="btn-back" onClick={() => navigate(`/contacts/${slug}`)}>
            ← Volver a Contactos
        </button>
    );
};

export default Home;
