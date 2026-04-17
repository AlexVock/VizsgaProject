import React from 'react';
import { Link } from 'react-router-dom';

const KezdoOldal = () => {
    return (
        <div className="min-vh-100 bg-white">
            {/* Felső Navigáció */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm sticky-top">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary fs-3" to="/">🏠 RoomMate</Link>
                    <div className="ms-auto">
                        <Link to="/login" className="btn btn-outline-primary fw-bold px-4 rounded-pill">Bejelentkezés</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Szekció */}
            <header className="py-5 bg-gradient-light">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-3 fw-bolder text-dark mb-2">Közös élet, <span className="text-primary">nulla konfliktus.</span></h1>
                                <p className="lead fw-normal text-muted mb-4">Minden, amire egy lakóközösségnek szüksége van: átlátható pénzügyek, közös teendők és instant chat. Próbáld ki te is!</p>
                                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                                    <Link to="/register" className="btn btn-primary btn-lg px-5 py-3 fw-bold rounded-3 shadow">Ingyenes Regisztráció</Link>
                                    <a href="#funkciok" className="btn btn-outline-dark btn-lg px-5 py-3 fw-bold rounded-3">Funkciók felfedezése</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
                            <img className="img-fluid rounded-3 my-5 shadow-lg" src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600" alt="Boldog lakótársak" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Funkciók Szekció */}
            <section className="py-5 bg-light" id="funkciok">
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-4 mb-5 mb-lg-0 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4 d-inline-block shadow">
                                <i className="bi bi-chat-dots fs-1">💬</i>
                            </div>
                            <h2 className="h4 fw-bolder">Instant Chat</h2>
                            <p className="text-muted">Beszéljétek meg a fontos dolgokat zárt, biztonságos csoportban.</p>
                        </div>
                        <div className="col-lg-4 mb-5 mb-lg-0 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4 d-inline-block shadow">
                                <i className="bi bi-cash-stack fs-1">💰</i>
                            </div>
                            <h2 className="h4 fw-bolder">Pénzügyek</h2>
                            <p className="text-muted">Vezessétek a közös kiadásokat és lássátok, ki mennyivel tartozik.</p>
                        </div>
                        <div className="col-lg-4 text-center">
                            <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 p-4 d-inline-block shadow">
                                <i className="bi bi-list-check fs-1">📋</i>
                            </div>
                            <h2 className="h4 fw-bolder">Teendők</h2>
                            <p className="text-muted">Takarítási rend és bevásárlólisták, amiket bárki kipipálhat.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark py-4 mt-auto">
                <div className="container px-5">
                    <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                        <div className="col-auto"><div className="small m-0 text-white">Copyright &copy; RoomMate 2026</div></div>
                        <div className="col-auto">
                            <Link className="link-light small" to="/">Főoldal</Link>
                            <span className="text-white mx-1">&middot;</span>
                            <Link className="link-light small" to="/login">Belépés</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default KezdoOldal;