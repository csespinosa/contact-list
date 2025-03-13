import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AgendaSelector from "./components/AgendaSelector";
import ContactCard from "./components/ContactCard";
import AddContact from "./components/AddContact.jsx"; // Agrega esta línea

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AgendaSelector />} />
                <Route path="/contacts/:slug" element={<ContactCard />} />
                <Route path="/add-contact/:slug" element={<AddContact />} />
            </Routes>
        </Router>
    );
};

export default App;