import React, { useState } from 'react';
import Penzugyek from './Penzugyek';
import Teendok from './Teendok';
import Chat from './Chat';

const Vezerlopult = ({ felhasznalo }) => {
    const [tab, setTab] = useState('penzugy');
    const csId = 1; // Itt a tesztelés kedvéért fix 1-es csoport ID

    return (
        <div className="container mt-4 pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">Szia, {felhasznalo.nev}! 👋</h2>
                    <p className="text-muted">RoomMate Vezérlőpult</p>
                </div>
                <div className="text-end">
                    <span className="badge bg-dark p-2">#1-es Szoba</span>
                </div>
            </div>

            <div className="btn-group w-100 mb-4 shadow-sm" role="group">
                <button className={`btn py-3 ${tab === 'penzugy' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('penzugy')}>💰 Pénzügyek</button>
                <button className={`btn py-3 ${tab === 'teendo' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('teendo')}>📋 Teendők</button>
                <button className={`btn py-3 ${tab === 'chat' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setTab('chat')}>💬 Chat</button>
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