import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = ({ csoportId, felhasznaloId }) => {
    const [uzenetek, setUzenetek] = useState([]);
    const [ujUzenet, setUjUzenet] = useState('');
    const chatVégeRef = useRef(null);

    const betoltes = async () => {
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            const v = await axios.get(apiBase, { 
                params: { muvelet: 'chat_listazas', csoport_id: csoportId } 
            });
            setUzenetek(Array.isArray(v.data) ? v.data : []);
        } catch (err) { console.error('Hiba a chat betöltésekor', err); }
    };

    useEffect(() => {
        betoltes();
        const idozito = setInterval(betoltes, 3000); // 3 másodpercenként frissít
        return () => clearInterval(idozito);
    }, []);

    useEffect(() => { chatVégeRef.current?.scrollIntoView({ behavior: "smooth" }); }, [uzenetek]);

    const kuldes = async (e) => {
        e.preventDefault();
        if (!ujUzenet.trim()) return;
        try {
            const apiBase = encodeURI('http://localhost/Vizsga Project/backend/api.php');
            await axios.post(`${apiBase}?muvelet=chat_kuldes`, { 
                szoveg: ujUzenet, 
                csoport_id: csoportId, 
                felhasznalo_id: felhasznaloId 
            });
        } catch (err) { console.error('Hiba a chat küldésekor', err); }
        setUjUzenet('');
        betoltes();
    };

    return (
        <div className="card shadow-sm border-info" style={{ height: '450px' }}>
            <div className="card-header bg-info text-white">Lakótársi Chat</div>
            <div className="card-body overflow-auto" style={{ background: '#f8f9fa' }}>
                {uzenetek.map(u => (
                    <div key={u.id} className={`mb-2 p-2 rounded shadow-sm ${u.felhasznalo_id === felhasznaloId ? 'ms-auto bg-primary text-white' : 'bg-white'}`} style={{ maxWidth: '75%', width: 'fit-content' }}>
                        <small className="d-block fw-bold" style={{ fontSize: '0.7rem' }}>{u.nev}</small>
                        {u.szoveg}
                    </div>
                ))}
                <div ref={chatVégeRef} />
            </div>
            <form onSubmit={kuldes} className="card-footer d-flex gap-2">
                <input type="text" className="form-control" placeholder="Üzenet írása..." value={ujUzenet} onChange={e => setUjUzenet(e.target.value)} />
                <button className="btn btn-info text-white">Küldés</button>
            </form>
        </div>
    );
};
export default Chat;