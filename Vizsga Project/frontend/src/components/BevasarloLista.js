import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BevasarloLista = () => {
    const [elemek, setElemek] = useState([]);
    const [ujTermek, setUjTermek] = useState('');
    const felhasznalo = JSON.parse(localStorage.getItem('felhasznalo'));
    const csoportId = localStorage.getItem('aktualisCsoportId'); // Ezt a belépésnél mentjük el

    useEffect(() => {
        adatokBetoltese();
    }, []);

    const adatokBetoltese = async () => {
        if (!csoportId) return;
        const valasz = await axios.get(`http://localhost/roommate-projekt/backend/api.php?muvelet=bevasarlas_lista&csoport_id=${csoportId}`);
        setElemek(valasz.data);
    };

    const hozzaadas = async (e) => {
        e.preventDefault();
        const adat = {
            csoport_id: csoportId,
            termek_nev: ujTermek,
            felhasznalo_id: felhasznalo.id
        };
        await axios.post('http://localhost/roommate-projekt/backend/api.php?muvelet=bevasarlas_lista', adat);
        setUjTermek('');
        adatokBetoltese(); // Lista frissítése
    };

    return (
        <div className="card shadow p-4">
            <h3>🛒 Közös bevásárlólista</h3>
            <form onSubmit={hozzaadas} className="d-flex mb-3">
                <input 
                    type="text" 
                    className="form-control me-2" 
                    placeholder="Mit vegyünk?" 
                    value={ujTermek}
                    onChange={(e) => setUjTermek(e.target.value)}
                    required
                />
                <button type="submit" className="btn btn-primary">Hozzáadás</button>
            </form>
            <ul className="list-group">
                {elemek.map((elem) => (
                    <li key={elem.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {elem.termek_nev}
                        <span className="badge bg-secondary">Hozzáadva</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BevasarloLista;