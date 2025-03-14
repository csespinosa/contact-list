import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import contactImg from "../assets/usuario.webp";
import "../styles/ContactCard.css";
import ModalToDelete from "./ModalToDelete";

const ContactCard = () => {
    const { slug } = useParams();
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const navigate = useNavigate();
    const API_BASE = `https://playground.4geeks.com/contact/agendas/${slug}`;

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(API_BASE);
                if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
                const data = await response.json();
                setContacts(data.contacts || []);
            } catch (error) {
                console.error(`Error cargando contactos: ${error}`);
                setContacts([]);
            }
        };
        fetchContacts();
    }, [slug]);

    const handleDelete = (contactId) => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
        setSelectedContact(null);
    };

    return (
        <div className="container contact-container mt-4">
            <h2 className="text-center contact-title">Contactos de la agenda: {slug}</h2>
            <div className="d-flex justify-content-end mb-3 contact-header">
                <button type="button" className="btn btn-success add-contact-btn" onClick={() => navigate(`/add-contact/${slug}`)}>
                    Add New Contact
                </button>
            </div>
            <div className="row justify-content-center contact-list">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div key={contact.id}>
                            <div className="contact-card">
                                <div className="contact-body">
                                    <div className="contact-img">
                                        <img src={contactImg} alt="Contact" className="img-fluid rounded-circle" />
                                    </div>
                                    <div className="contact-info">
                                        <h5 className="mb-1">{contact.name}</h5>
                                        <p className="mb-1"><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
                                        <p className="mb-1"><i className="fas fa-phone"></i> {contact.phone}</p>
                                        <p className="mb-0"><i className="fas fa-envelope"></i> {contact.email}</p>
                                    </div>
                                    <div className="contact-actions">
                                        <button className="btn btn-outline-secondary edit-btn">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button
                                            className="btn btn-outline-danger delete-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#deleteModal"
                                            onClick={() => setSelectedContact(contact.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center no-contacts">No hay contactos disponibles.</p>
                )}
            </div>
            <button className="btn-back" onClick={() => navigate(`/`)}>
                ← Volver a Home
            </button>

            {selectedContact && (
                <ModalToDelete contactId={selectedContact} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default ContactCard;