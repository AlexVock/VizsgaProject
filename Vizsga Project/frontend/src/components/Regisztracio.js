import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Regisztracio = () => {
    const [adatok, setAdatok] = useState({ nev: '', email: '', jelszo: '' });
    const [hiba, setHiba] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const v = await axios.post('http://localhost/Vizsga Project/backend/api.php?muvelet=regisztracio', adatok);
            if (v.data.siker) {
                alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
                navigate('/login');
            } else {
                setHiba(v.data.uzenet);
            }
        } catch (err) {
            setHiba("Hiba történt a regisztráció során.");
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card shadow border-0 p-4">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="fw-bold text-success mb-0">Regisztráció</h2>
                        <button onClick={() => navigate('/')} className="btn btn-sm btn-outline-secondary">← Vissza</button>
                    </div>

                    {hiba && <div className="alert alert-danger">{hiba}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Teljes név</label>
                            <input type="text" className="form-control" value={adatok.nev} onChange={e => setAdatok({...adatok, nev: e.target.value})} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email cím</label>
                            <input type="email" className="form-control" value={adatok.email} onChange={e => setAdatok({...adatok, email: e.target.value})} required />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Jelszó</label>
                            <input type="password" className="form-control" value={adatok.jelszo} onChange={e => setAdatok({...adatok, jelszo: e.target.value})} required />
                        </div>
                        <button type="submit" className="btn btn-success w-100 py-2 fw-bold mb-3 shadow-sm">Fiók létrehozása</button>
                    </form>
                    <p className="text-center mt-3 small">
                        Van már fiókod? <Link to="/login" className="text-decoration-none fw-bold text-success">Jelentkezz be</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Regisztracio;