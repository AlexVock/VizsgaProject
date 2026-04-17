import React, { useState } from 'react';
import axios from 'axios';

const SzobaValaszto = ({ felhasznalo, onCsoportBeallitas }) => {
    const [szobaNev, setSzobaNev] = useState('');
    const [szobaKod, setSzobaKod] = useState('');
    const [hiba, setHiba] = useState('');
    const [toltes, setToltes] = useState(false);

    const letrehozas = async (e) => {
        e.preventDefault();
        setToltes(true);
        setHiba('');
        try {
            const bekuldes = { nev: szobaNev, felhasznalo_id: felhasznalo.id };
            console.log("Küldés:", bekuldes);
            
            const v = await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=csoport_letrehozas', bekuldes);
            
            console.log("Szerver válasz:", v.data);
            
            if (v.data.siker) {
                onCsoportBeallitas(v.data.csoport_id, v.data.csoport_nev, v.data.kod);
            } else {
                setHiba(v.data.uzenet || "Sikertelen létrehozás");
            }
        } catch (err) {
            console.error("Hiba:", err);
            setHiba("Nem sikerült elérni a szervert.");
        } finally {
            setToltes(false);
        }
    };

    const csatlakozas = async (e) => {
        e.preventDefault();
        setToltes(true);
        setHiba('');
        try {
            const v = await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=csoport_csatlakozas', {
                kod: szobaKod,
                felhasznalo_id: felhasznalo.id
            });
            if (v.data.siker) {
                onCsoportBeallitas(v.data.csoport_id, v.data.csoport_nev, v.data.kod);
            } else {
                setHiba(v.data.uzenet);
            }
        } catch (err) {
            setHiba("Hálózati hiba.");
        } finally {
            setToltes(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center text-center mb-5">
                <div className="col-md-8">
                    <h1 className="display-4 fw-bold">🏠 Szoba választása</h1>
                    <p className="lead text-muted small">Csatlakozz egy meglévőhöz vagy hozz létre egy újat!</p>
                </div>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-md-5">
                    <div className="card h-100 shadow border-0">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-3">Új szoba</h3>
                            <form onSubmit={letrehozas}>
                                <input type="text" className="form-control mb-3" placeholder="Szoba neve..." 
                                    value={szobaNev} onChange={e => setSzobaNev(e.target.value)} required />
                                <button type="submit" disabled={toltes} className="btn btn-primary w-100 py-2 fw-bold">
                                    {toltes ? 'Folyamatban...' : 'Létrehozás'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-5">
                    <div className="card h-100 shadow border-0">
                        <div className="card-body p-4">
                            <h3 className="fw-bold mb-3">Csatlakozás</h3>
                            <form onSubmit={csatlakozas}>
                                <input type="text" className="form-control mb-3" placeholder="6 jegyű kód..." 
                                    value={szobaKod} onChange={e => setSzobaKod(e.target.value)} required />
                                <button type="submit" disabled={toltes} className="btn btn-outline-primary w-100 py-2 fw-bold">
                                    Belépés
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {hiba && <div className="alert alert-danger mt-4 text-center">{hiba}</div>}
        </div>
    );
};

export default SzobaValaszto;