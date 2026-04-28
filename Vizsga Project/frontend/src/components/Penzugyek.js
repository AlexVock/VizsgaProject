import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const Penzugyek = ({ csoportId, felhasznaloId }) => {
    const [adatok, setAdatok] = useState([]);
    const [uj, setUj] = useState({ megnevezes: '', osszeg: '', kategoria: 'Élelmiszer' });
    const [szerkesztettId, setSzerkesztettId] = useState(null);

    const kategoriak = ["Élelmiszer", "Rezsi", "Tisztítószer", "Lakbér", "Szórakozás", "Egyéb"];

    const betoltes = async () => {
        try {
            const v = await axios.get('http://localhost/Vizsga Project/backend/api.php', { 
                params: { muvelet: 'penzugy_listazas', csoport_id: csoportId } 
            });
            setAdatok(Array.isArray(v.data) ? v.data : []);
        } catch (err) {
            console.error("Hiba a betöltéskor");
        }
    };

    useEffect(() => {
        betoltes();
    }, [csoportId]);

    const mentes = async (e) => {
        e.preventDefault();
        try {
            if (szerkesztettId) {
                await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=penzugy_szerkesztes', { 
                    ...uj, id: szerkesztettId 
                });
                setSzerkesztettId(null);
            } else {
                await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=penzugy_mentes', { 
                    ...uj, csoport_id: csoportId, felhasznalo_id: felhasznaloId 
                });
            }
            setUj({ megnevezes: '', osszeg: '', kategoria: 'Élelmiszer' });
            betoltes();
        } catch (err) {
            alert("Hiba történt a mentés során.");
        }
    };

    const torles = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt a kiadást?")) {
            try {
                await axios.get('http://localhost/Vizsga Project/backend/api.php', { 
                    params: { muvelet: 'penzugy_torles', id: id } 
                });
                betoltes();
            } catch (err) {
                alert("Hiba a törlésnél.");
            }
        }
    };

    const szerkesztesKezdes = (item) => {
        setUj({ megnevezes: item.megnevezes, osszeg: item.osszeg, kategoria: item.kategoria });
        setSzerkesztettId(item.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const osszKoltseg = useMemo(() => {
        return adatok.reduce((sum, item) => sum + Number(item.osszeg), 0);
    }, [adatok]);

    const kategoriaStatisztika = useMemo(() => {
        return adatok.reduce((acc, curr) => {
            acc[curr.kategoria] = (acc[curr.kategoria] || 0) + Number(curr.osszeg);
            return acc;
        }, {});
    }, [adatok]);

    return (
        <div className="row">
            <div className="col-lg-7">
                <div className="card shadow-sm border-0 mb-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <div className="card-body">
                        <h4 className="fw-bold mb-3">{szerkesztettId ? 'Kiadás szerkesztése' : 'Új kiadás rögzítése'}</h4>
                        <form onSubmit={mentes} className="row g-2">
                            <div className="col-md-5">
                                <label className="form-label small fw-bold">Megnevezés</label>
                                <input type="text" className="form-control" value={uj.megnevezes} onChange={e => setUj({...uj, megnevezes: e.target.value})} required />
                            </div>
                            <div className="col-md-3">
                                <label className="form-label small fw-bold">Összeg (Ft)</label>
                                <input type="number" className="form-control" value={uj.osszeg} onChange={e => setUj({...uj, osszeg: e.target.value})} required />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label small fw-bold">Kategória</label>
                                <select className="form-select" value={uj.kategoria} onChange={e => setUj({...uj, kategoria: e.target.value})}>
                                    {kategoriak.map(k => <option key={k} value={k}>{k}</option>)}
                                </select>
                            </div>
                            <div className="d-flex gap-2 mt-3">
                                <button type="submit" className={`btn w-100 ${szerkesztettId ? 'btn-warning' : 'btn-primary'}`}>
                                    {szerkesztettId ? 'Változtatások mentése' : 'Hozzáadás a listához'}
                                </button>
                                {szerkesztettId && (
                                    <button type="button" className="btn btn-secondary" onClick={() => {setSzerkesztettId(null); setUj({megnevezes:'', osszeg:'', kategoria:'Élelmiszer'});}}>Mégse</button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="fw-bold mb-3">Tranzakciók</h5>
                        <div className="list-group list-group-flush">
                            {adatok.length > 0 ? adatok.map(p => (
                                <div key={p.id} className="list-group-item d-flex justify-content-between align-items-center px-0 py-3">
                                    <div className="flex-grow-1">
                                        <div className="fw-bold">{p.megnevezes}</div>
                                        <div className="text-muted small">{p.kategoria} • {p.nev}</div>
                                    </div>
                                    <div className="text-end me-3">
                                        <span className="fw-bold text-primary">{Number(p.osszeg).toLocaleString()} Ft</span>
                                    </div>
                                    <div className="btn-group shadow-sm">
                                        <button className="btn btn-sm btn-white border" onClick={() => szerkesztesKezdes(p)}>✏️</button>
                                        <button className="btn btn-sm btn-white border text-danger" onClick={() => torles(p.id)}>🗑️</button>
                                    </div>
                                </div>
                            )) : <p className="text-center text-muted py-4">Nincs még rögzített kiadás.</p>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-5">
                <div className="card shadow-sm border-0 p-4 sticky-top" style={{ top: '20px' }}>
                    <h5 className="text-muted text-center mb-1">Havi összes költés</h5>
                    <h1 className="display-6 fw-bold text-center text-primary mb-4">{osszKoltseg.toLocaleString()} Ft</h1>
                    
                    <h6 className="fw-bold mb-3">Kategória szerinti bontás</h6>
                    {Object.keys(kategoriaStatisztika).length > 0 ? Object.keys(kategoriaStatisztika).map(kat => {
                        const szazalek = (kategoriaStatisztika[kat] / osszKoltseg) * 100;
                        return (
                            <div key={kat} className="mb-3">
                                <div className="d-flex justify-content-between mb-1 small">
                                    <span className="fw-bold">{kat}</span>
                                    <span>{kategoriaStatisztika[kat].toLocaleString()} Ft ({Math.round(szazalek)}%)</span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-primary shadow-sm" style={{ width: `${szazalek}%` }}></div>
                                </div>
                            </div>
                        );
                    }) : <p className="text-muted small text-center">Nincs statisztikai adat.</p>}
                </div>
            </div>
        </div>
    );
};

export default Penzugyek;