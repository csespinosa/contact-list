import React from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ModalToDelete = ({ contactId, onDelete }) => {
    const { slug } = useParams();
    const API_BASE = `https://playground.4geeks.com/contact/agendas/${slug}/contacts/${contactId}`;

    const deleteContact = async () => {
        try {
            const response = await fetch(API_BASE, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) throw new Error(`Error HTTP ${response.status}: ${response.statusText}`);

            console.log(`Contacto ${contactId} eliminado correctamente`);
            onDelete(contactId);
        } catch (error) {
            console.error("Error al eliminar contacto:", error);
        }
    };

    return (
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">¿Estás seguro?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Si eliminas este contacto, no podrás recuperarlo.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={deleteContact} data-bs-dismiss="modal">
                            Sí, eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ModalToDelete.propTypes = {
    contactId: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ModalToDelete;