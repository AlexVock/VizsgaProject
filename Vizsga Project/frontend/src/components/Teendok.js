import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teendok = ({ csoportId, felhasznaloId }) => {
    const [lista, setLista] = useState([]);
    const [ujFeladat, setUjFeladat] = useState('');

    const betoltes = async () => {
        try {
            const v = await axios.get('http://localhost/Vizsga Project/backend/api.php', { 
                params: { muvelet: 'teendo_listazas', csoport_id: csoportId } 
            });
            setLista(Array.isArray(v.data) ? v.data : []);
        } catch (err) { console.error("Hiba a teendők betöltésekor"); }
    };

    useEffect(() => { betoltes(); }, []);

    const mentes = async (e) => {
        e.preventDefault();
        if (!ujFeladat.trim()) return;
        await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=teendo_mentes', { 
            feladat: ujFeladat, 
            csoport_id: csoportId, 
            felhasznalo_id: felhasznaloId 
        });
        setUjFeladat('');
        betoltes();
    };

    return (
        <div className="card p-3 shadow-sm border-warning">
            <h4>📋 Közös Teendők</h4>
            <form onSubmit={mentes} className="mb-3 d-flex gap-2">
                <input type="text" className="form-control" placeholder="Új feladat..." 
                    value={ujFeladat} onChange={e => setUjFeladat(e.target.value)} required />
                <button className="btn btn-warning text-white">Hozzáad</button>
            </form>
            <div className="list-group">
                {lista.map(t => (
                    <div key={t.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{t.feladat}</span>
                        <small className="text-muted">Felelős: {t.nev}</small>
                    </div>
                ))}
                {lista.length === 0 && <p className="text-center text-muted">Nincs aktív teendő.</p>}
            </div>
        </div>
    );
};
export default Teendok;