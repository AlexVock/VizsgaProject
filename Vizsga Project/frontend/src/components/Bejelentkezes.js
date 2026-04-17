import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Bejelentkezes = ({ setFelhasznalo }) => {
    const [email, setEmail] = useState('');
    const [jelszo, setJelszo] = useState('');
    const [hiba, setHiba] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const v = await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=bejelentkezes', {
                email, jelszo
            });
            if (v.data.siker) {
                localStorage.setItem('felhasznalo', JSON.stringify(v.data.felhasznalo));
                setFelhasznalo(v.data.felhasznalo);
            } else {
                setHiba(v.data.uzenet);
            }
        } catch (err) {
            setHiba("Hálózati hiba történt!");
        }
    };

    return (
        <div className="container py-5 mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-lg border-0 p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold text-primary mb-0">Belépés</h2>
                            <button onClick={() => navigate('/')} className="btn btn-sm btn-outline-secondary rounded-pill px-3">← Vissza</button>
                        </div>
                        
                        {hiba && <div className="alert alert-danger py-2">{hiba}</div>}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Email cím</label>
                                <input type="email" className="form-control form-control-lg" value={email} onChange={e => setEmail(e.target.value)} placeholder="nev@pelda.hu" required />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold">Jelszó</label>
                                <input type="password" className="form-control form-control-lg" value={jelszo} onChange={e => setJelszo(e.target.value)} placeholder="••••••••" required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm">Bejelentkezés</button>
                        </form>
                        
                        <div className="text-center mt-4">
                            <span className="text-muted small">Nincs még fiókod? </span>
                            <Link to="/register" className="text-primary text-decoration-none small fw-bold">Regisztrálj most</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bejelentkezes;