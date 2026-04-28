import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ felhasznalo, kilepes, csoportInfo }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSignOut = () => {
        setShowConfirm(true);
    };

    const confirmSignOut = () => {
        setShowConfirm(false);
        kilepes();
    };

    const cancelSignOut = () => setShowConfirm(false);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/vezerlopult">RoomMate</Link>
                    
                    {csoportInfo && (
                        <div className="navbar-text text-white d-none d-md-block mx-auto">
                            <span className="badge bg-primary px-3 py-2">
                                Szoba: {csoportInfo.nev} | Kód: <strong className="text-warning">{csoportInfo.kod}</strong>
                            </span>
                        </div>
                    )}

                    <div className="d-flex align-items-center">
                        <a href="/profil" className="text-white-50 me-3 small text-decoration-none">{felhasznalo.nev}</a>
                        <button onClick={handleSignOut} className="btn btn-sm btn-outline-danger">Kijelentkezés</button>
                    </div>
                </div>
            </nav>

            {showConfirm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1050, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="card p-4" style={{ minWidth: 300 }}>
                        <h5 className="mb-3">Kijelentkezés megerősítése</h5>
                        <p>Biztosan ki szeretnél jelentkezni?</p>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" onClick={cancelSignOut}>Mégse</button>
                            <button className="btn btn-danger" onClick={confirmSignOut}>Kijelentkezés</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;