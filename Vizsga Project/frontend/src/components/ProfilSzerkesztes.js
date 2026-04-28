import React, { useState } from 'react';
import axios from 'axios';

const ProfilSzerkesztes = ({ felhasznalo, setFelhasznalo }) => {
    const [nev, setNev] = useState(felhasznalo.nev);
    const [szin, setSzin] = useState(felhasznalo.profil_szin || '#4a90e2');

    const mentes = async () => {
        try {
            const adat = { id: felhasznalo.id, nev: nev, szin: szin };
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            const valasz = await axios.post(`${apiBase}?muvelet=profil_frissites`, adat);
            if(valasz.data.siker) {
                // update localStorage and parent state
                const uj = { ...felhasznalo, nev: valasz.data.felhasznalo.nev, profil_szin: valasz.data.felhasznalo.profil_szin };
                localStorage.setItem('felhasznalo', JSON.stringify(uj));
                if (setFelhasznalo) setFelhasznalo(uj);
                alert("Profil frissítve!");
            } else {
                alert('Hiba: ' + (valasz.data.uzenet || 'Nem sikerült frissíteni'));
            }
        } catch (err) { console.error('Profil mentési hiba', err); alert('Hálózati hiba'); }
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