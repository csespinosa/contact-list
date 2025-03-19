import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/ModalToEdit.css";

const ModalToEdit = ({ isOpen, onClose, contactToEdit, onSave }) => {
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name || "",
                email: contactToEdit.email || "",
                phone: contactToEdit.phone || "",
                address: contactToEdit.address || ""
            });
        } else {
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: ""
            });
        }
    }, [contactToEdit, isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const isEditing = contactToEdit && contactToEdit.id;
            const url = isEditing
                ? `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactToEdit.id}`
                : `https://playground.4geeks.com/contact/agendas/${slug}/contacts`;

            const method = isEditing ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log(isEditing ? "Contacto actualizado" : "Contacto creado");
                if (onSave) onSave();
            } else {
                console.error("Error en la respuesta:", response.status);
            }
        } catch (error) {
            console.error("Error al procesar el contacto:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{contactToEdit ? "Editar Contacto" : "Agregar Contacto"}</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Dirección</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                            disabled={isLoading}
                        >
                            {isLoading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalToEdit;