import React, { useState } from "react";
import "../styles/ModalToDelete.css";

const ModalToDelete = ({ contactId, onDelete, onClose, isOpen }) => {
    const [isClosing, setIsClosing] = useState(false);

    if (!isOpen) return null;

    const handleConfirmDelete = () => {
        onDelete(contactId);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    return (
        <div className={`modal-overlay ${isClosing ? 'modal-closing' : ''}`}>
            <div className="modal-content">
                <button className="close-button" onClick={handleClose}>×</button>
                <h2>¿Estás seguro?</h2>
                <p>Si eliminas este contacto, no podrás recuperarlo.</p>
                
                <div className="button-group">
                    <button 
                        className="cancel-button" 
                        onClick={handleClose}
                    >
                        Cancelar
                    </button>
                    <button 
                        className="delete-button" 
                        onClick={handleConfirmDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalToDelete;