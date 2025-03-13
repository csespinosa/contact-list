import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddContact.css";

const AddContactForm = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const API_URL = `https://playground.4geeks.com/contact/agendas/${slug}/contacts`;

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            console.log("Contacto agregado con éxito");
            navigate(`/contacts/${slug}`);
        } catch (error) {
            console.error("Error al agregar el contacto:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-contact-container">
            <div className="form-card">
                <h2 className="title">Agregar Nuevo Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            placeholder="Nombre Completo "
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            placeholder="@correo.com"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={contact.phone}
                            onChange={handleChange}
                            placeholder="Ej. +569"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={contact.address}
                            onChange={handleChange}
                            placeholder="Dirección"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-save" disabled={loading}>
                        {loading ? "Guardando..." : "Guardar Contacto"}
                    </button>
                </form>
                <button className="btn-back" onClick={() => navigate(`/contacts/${slug}`)}>
                    ← Volver a Contactos
                </button>
            </div>
        </div>
    );
};

export default AddContactForm;