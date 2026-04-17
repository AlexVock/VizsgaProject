import React, { useState } from 'react';
import axios from 'axios';

const ProfilSzerkesztes = ({ felhasznalo }) => {
    const [nev, setNev] = useState(felhasznalo.nev);
    const [szin, setSzin] = useState(felhasznalo.profil_szin || '#4a90e2');

    const mentes = async () => {
        const adat = { id: felhasznalo.id, nev: nev, szin: szin };
        const valasz = await axios.post('http://localhost/Vizsga%20Project/backend/api.php?muvelet=profil_frissites', adat);
        if(valasz.data.siker) {
            alert("Profil frissítve! Jelentkezz be újra a változáshoz.");
        }
    };

    return (
        <div className="card shadow-sm p-4 mt-4">
            <h3>Profilom szerkesztése</h3>
            <div className="mb-3">
                <label className="form-label">Megjelenítési név</label>
                <input type="text" className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} />
            </div>
            <div className="mb-3">
                <label className="form-label">Profil színe (hogy felismerjenek a chatben)</label>
                <input type="color" className="form-control form-control-color w-100" value={szin} onChange={(e) => setSzin(e.target.value)} />
            </div>
            <button onClick={mentes} className="btn btn-primary w-100">Mentés</button>
        </div>
    );
};

export default ProfilSzerkesztes;