import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ felhasznalo, kilepes, csoportInfo }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-4">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/vezerlopult">🏠 RoomMate</Link>
                
                {csoportInfo && (
                    <div className="navbar-text text-white d-none d-md-block mx-auto">
                        <span className="badge bg-primary px-3 py-2">
                            Szoba: {csoportInfo.nev} | Kód: <strong className="text-warning">{csoportInfo.kod}</strong>
                        </span>
                    </div>
                )}

                <div className="d-flex align-items-center">
                    <span className="text-white-50 me-3 small">{felhasznalo.nev}</span>
                    <button onClick={kilepes} className="btn btn-sm btn-outline-danger">Kijelentkezés</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;