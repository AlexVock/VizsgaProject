import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teendok = ({ csoportId, felhasznaloId }) => {
    const [lista, setLista] = useState([]);
    const [ujFeladat, setUjFeladat] = useState('');

    const betoltes = async () => {
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            const v = await axios.get(apiBase, { params: { muvelet: 'teendo_listazas', csoport_id: csoportId } });
            setLista(Array.isArray(v.data) ? v.data : []);
        } catch (err) { console.error("Hiba a teendők betöltésekor", err); }
    };

    useEffect(() => { betoltes(); }, []);

    const updateKesz = async (id, kesz) => {
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            await axios.post(`${apiBase}?muvelet=teendo_frissites`, { id, kesz });
            await betoltes();
        } catch (err) { console.error('Hiba a teendő frissítésekor', err); }
    };

    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const startEdit = (t, e) => {
        e && e.stopPropagation();
        setEditId(t.id);
        setEditText(t.feladat);
    };

    const cancelEdit = (e) => {
        e && e.stopPropagation();
        setEditId(null);
        setEditText('');
    };

    const saveEdit = async (e) => {
        e && e.preventDefault();
        if (!editText.trim()) return;
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            await axios.post(`${apiBase}?muvelet=teendo_szerkesztes`, { id: editId, feladat: editText });
            setEditId(null);
            setEditText('');
            await betoltes();
        } catch (err) { console.error('Hiba a teendő szerkesztésekor', err); }
    };

    const onDragStart = (e, t) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({ id: t.id, kesz: t.kesz }));
    };

    const onDragOver = (e) => { e.preventDefault(); };

    const onDrop = (e, targetKesz) => {
        e.preventDefault();
        try {
            const d = JSON.parse(e.dataTransfer.getData('text/plain'));
            if ((d.kesz ? 1 : 0) !== (targetKesz ? 1 : 0)) {
                updateKesz(d.id, targetKesz ? 1 : 0);
            }
        } catch (err) { console.error('Drop parse hiba', err); }
    };

    const mentes = async (e) => {
        e.preventDefault();
        if (!ujFeladat.trim()) return;
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            await axios.post(`${apiBase}?muvelet=teendo_mentes`, { feladat: ujFeladat, csoport_id: csoportId, felhasznalo_id: felhasznaloId });
            setUjFeladat('');
            await betoltes();
        } catch (err) { console.error('Hiba a teendő mentésekor', err); }
    };

    return (
        <div className="card p-3 shadow-sm border-warning">
            <h4>Közös Teendők</h4>
            <form onSubmit={mentes} className="mb-3 d-flex gap-2">
                <input type="text" className="form-control" placeholder="Új feladat..." 
                    value={ujFeladat} onChange={e => setUjFeladat(e.target.value)} required />
                <button className="btn btn-warning text-white">Hozzáad</button>
            </form>
            <div className="row">
                <div className="col-md-6">
                    <div className="card p-2 mb-2" onDragOver={onDragOver} onDrop={(e) => onDrop(e, false)}>
                        <h5 className="mb-2">Folyamatban</h5>
                        {lista.filter(x => !x.kesz || x.kesz == 0).map(t => (
                            <div key={t.id} draggable onDragStart={(e) => onDragStart(e, t)} className="mb-2 p-2 border rounded bg-white">
                                <div className="d-flex justify-content-between">
                                    <div style={{ flex: 1 }}>
                                        {editId === t.id ? (
                                            <form onSubmit={saveEdit} className="d-flex gap-2">
                                                <input autoFocus className="form-control" value={editText} onChange={e => setEditText(e.target.value)} />
                                                <button className="btn btn-sm btn-primary">Mentés</button>
                                                <button type="button" className="btn btn-sm btn-secondary" onClick={cancelEdit}>Mégse</button>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="fw-bold">{t.feladat}</div>
                                                <small className="text-muted">Felelős: {t.nev}</small>
                                            </>
                                        )}
                                    </div>
                                    <div className="ms-2 d-flex flex-column gap-1">
                                        <button className="btn btn-sm btn-success" onClick={(e) => { e.stopPropagation(); updateKesz(t.id, 1); }}>Kész</button>
                                        {editId !== t.id && <button className="btn btn-sm btn-outline-primary" onClick={(e) => startEdit(t, e)}>Szerkeszt</button>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {lista.filter(x => !x.kesz || x.kesz == 0).length === 0 && <p className="text-muted text-center">Nincs folyamatban lévő teendő.</p>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card p-2 mb-2" onDragOver={onDragOver} onDrop={(e) => onDrop(e, true)}>
                        <h5 className="mb-2">Kész</h5>
                        {lista.filter(x => x.kesz && x.kesz == 1).map(t => (
                            <div key={t.id} draggable onDragStart={(e) => onDragStart(e, t)} className="mb-2 p-2 border rounded bg-light">
                                <div className="d-flex justify-content-between">
                                    <div style={{ flex: 1 }}>
                                        {editId === t.id ? (
                                            <form onSubmit={saveEdit} className="d-flex gap-2">
                                                <input autoFocus className="form-control" value={editText} onChange={e => setEditText(e.target.value)} />
                                                <button className="btn btn-sm btn-primary">Mentés</button>
                                                <button type="button" className="btn btn-sm btn-secondary" onClick={cancelEdit}>Mégse</button>
                                            </form>
                                        ) : (
                                            <>
                                                <div className="fw-bold">{t.feladat}</div>
                                                <small className="text-muted">Felelős: {t.nev}</small>
                                            </>
                                        )}
                                    </div>
                                    <div className="ms-2 d-flex flex-column gap-1">
                                        <button className="btn btn-sm btn-outline-secondary" onClick={(e) => { e.stopPropagation(); updateKesz(t.id, 0); }}>Vissza</button>
                                        {editId !== t.id && <button className="btn btn-sm btn-outline-primary" onClick={(e) => startEdit(t, e)}>Szerkeszt</button>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {lista.filter(x => x.kesz && x.kesz == 1).length === 0 && <p className="text-muted text-center">Nincs kész teendő.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Teendok;