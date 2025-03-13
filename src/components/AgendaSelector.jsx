import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AgendaSelector.css";

const AgendaSelector = () => {
    const [agendas, setAgendas] = useState([]);
    const navigate = useNavigate();
    const API_BASE = "https://playground.4geeks.com/contact/agendas";

    useEffect(() => {
        const fetchAgendas = async () => {
            try {
                const response = await fetch(API_BASE);
                if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
                const data = await response.json();
                setAgendas(data.agendas || []);
            } catch (error) {
                console.error(`Error cargando agendas: ${error}`);
            }
        };
        fetchAgendas();
    }, []);

    return (
        <div className="agenda-container">
            <h1 className="agenda-title">Selecciona una Agenda</h1>
            <p className="agenda-subtitle">Elige una de las siguientes agendas para ver sus contactos</p>
            <div className="agenda-grid">
                {agendas.map((agenda) => (
                    <div
                        key={agenda.id}
                        className="agenda-card"
                        onClick={() => navigate(`/contacts/${agenda.slug}`)}
                    >
                        {agenda.slug.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgendaSelector;