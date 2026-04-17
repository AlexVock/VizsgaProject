import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Bejelentkezes from './components/Bejelentkezes';
import Regisztracio from './components/Regisztracio';
import Vezerlopult from './components/Vezerlopult';
import SzobaValaszto from './components/SzobaValaszto';
import KezdoOldal from './components/KezdoOldal';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {
    const [felhasznalo, setFelhasznalo] = useState(JSON.parse(localStorage.getItem('felhasznalo')));
    const [csoportInfo, setCsoportInfo] = useState(null);

    useEffect(() => {
        if (felhasznalo && felhasznalo.csoport_id) {
            axios.get(`http://localhost/Vizsga Project/backend/api.php?muvelet=csoport_adatok&csoport_id=${felhasznalo.csoport_id}`)
                .then(res => {
                    if (res.data) setCsoportInfo(res.data);
                });
        }
    }, [felhasznalo]);

    const handleCsoportBeallitas = (id, nev, kod) => {
        const ujUser = { ...felhasznalo, csoport_id: id };
        localStorage.setItem('felhasznalo', JSON.stringify(ujUser));
        setFelhasznalo(ujUser);
        setCsoportInfo({ nev, kod });
    };

    const kilepes = () => {
        localStorage.removeItem('felhasznalo');
        setFelhasznalo(null);
        setCsoportInfo(null);
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Így a Navbar is biztonságban van, mert az index.js-ben lévő Routeren belül van */}
            {felhasznalo && <Navbar felhasznalo={felhasznalo} kilepes={kilepes} csoportInfo={csoportInfo} />}
            
            <Routes>
                <Route path="/" element={!felhasznalo ? <KezdoOldal /> : <Navigate to="/vezerlopult" />} />
                <Route path="/login" element={!felhasznalo ? <Bejelentkezes setFelhasznalo={setFelhasznalo} /> : <Navigate to="/vezerlopult" />} />
                <Route path="/register" element={!felhasznalo ? <Regisztracio /> : <Navigate to="/vezerlopult" />} />
                
                <Route path="/vezerlopult" element={
                    felhasznalo ? (
                        felhasznalo.csoport_id ? <Vezerlopult felhasznalo={felhasznalo} /> : 
                        <SzobaValaszto felhasznalo={felhasznalo} onCsoportBeallitas={handleCsoportBeallitas} />
                    ) : <Navigate to="/" />
                } />
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;