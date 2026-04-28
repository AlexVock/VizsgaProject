import React, { useState } from 'react';
import Penzugyek from './Penzugyek';
import Teendok from './Teendok';
import Chat from './Chat';

const Vezerlopult = ({ felhasznalo }) => {
    const [tab, setTab] = useState('penzugy');
    const csId = 1; // Itt a tesztelés kedvéért fix 1-es csoport ID

    const handleLeave = async () => {
        if (!window.confirm('Biztosan el akarod hagyni a szobát?')) return;
        try {
            const backendBase = window.location.hostname === 'localhost' ? 'http://localhost' : window.location.origin;
            const apiPath = encodeURI(`${backendBase}/Vizsga Project/backend/api.php?muvelet=csoport_elhagyas`);
            const res = await fetch(apiPath, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ felhasznalo_id: felhasznalo.id })
            });
            const data = await res.json();
            if (data.siker) {
                alert('Sikeresen elhagytad a szobát.');
                // Frissítsük a lokális felhasználó objektumot, hogy a csoport_id törlődjön
                try {
                    const stored = JSON.parse(localStorage.getItem('felhasznalo')) || {};
                    stored.csoport_id = null;
                    localStorage.setItem('felhasznalo', JSON.stringify(stored));
                } catch (e) { /* ignore */ }
                // Újratöltés, hogy az App komponens új állapotot olvasson
                window.location.reload();
            } else {
                alert('Hiba: ' + (data.uzenet || 'Nem sikerült elhagyni a szobát.'));
            }
        } catch (e) {
            alert('Hálózati hiba: ' + e.message);
        }
    };

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">Szia, {felhasznalo.nev}! 👋</h2>
                    <p className="text-muted">RoomMate Vezérlőpult</p>
                </div>
                <div className="text-end">
                    <span className="badge bg-dark p-2 me-2">#1-es Szoba</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={handleLeave}>Szoba elhagyása</button>
                </div>
            </div>

            <div className="btn-group w-100 mb-4 shadow-sm" role="group">
                <button className={`btn py-3 ${tab === 'penzugy' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('penzugy')}><strong>Pénzügyek</strong></button>
                <button className={`btn py-3 ${tab === 'teendo' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('teendo')}><strong>Teendők</strong></button>
                <button className={`btn py-3 ${tab === 'chat' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('chat')}><strong>Chat</strong></button>
            </div>

            <div className="row justify-content-center">
                <div className="col-12 col-lg-10">
                    {tab === 'penzugy' && <Penzugyek csoportId={csId} felhasznaloId={felhasznalo.id} />}
                    {tab === 'teendo' && <Teendok csoportId={csId} felhasznaloId={felhasznalo.id} />}
                    {tab === 'chat' && <Chat csoportId={csId} felhasznaloId={felhasznalo.id} />}
                </div>
            </div>
        </div>
    );
};

export default Vezerlopult;