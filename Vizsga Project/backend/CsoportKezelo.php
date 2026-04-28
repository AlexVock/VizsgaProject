<?php
class CsoportKezelo {
    private $kapcsolat;

    public function __construct($db) {
        $this->kapcsolat = $db;
    }

    public function letrehozas($adatok) {
        // Random 6 jegyű kód generálása
        $karakterek = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $kod = '';
        for ($i = 0; $i < 6; $i++) {
            $kod .= $karakterek[rand(0, strlen($karakterek) - 1)];
        }
        
        try {
            // 1. Csoport beszúrása
            $query = "INSERT INTO csoportok (nev, kod, letrehozo_id) VALUES (?, ?, ?)";
            $stmt = $this->kapcsolat->prepare($query);
            $stmt->execute([$adatok->nev, $kod, $adatok->felhasznalo_id]);
            
            $csoport_id = $this->kapcsolat->lastInsertId();
            
            // 2. A létrehozó felhasználó csoport_id-jának frissítése
            $update = "UPDATE felhasznalok SET csoport_id = ? WHERE id = ?";
            $this->kapcsolat->prepare($update)->execute([$csoport_id, $adatok->felhasznalo_id]);
            
            return [
                "siker" => true, 
                "csoport_id" => $csoport_id, 
                "csoport_nev" => $adatok->nev, 
                "kod" => $kod
            ];
        } catch (PDOException $e) {
            return ["siker" => false, "uzenet" => "Adatbázis hiba: " . $e->getMessage()];
        }
    }

    public function csatlakozas($adatok) {
        try {
            $stmt = $this->kapcsolat->prepare("SELECT id, nev FROM csoportok WHERE kod = ?");
            $stmt->execute([$adatok->kod]);
            $csoport = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($csoport) {
                $update = "UPDATE felhasznalok SET csoport_id = ? WHERE id = ?";
                $this->kapcsolat->prepare($update)->execute([$csoport['id'], $adatok->felhasznalo_id]);
                
                return [
                    "siker" => true, 
                    "csoport_id" => $csoport['id'], 
                    "csoport_nev" => $csoport['nev'],
                    "kod" => $adatok->kod
                ];
            }
            return ["siker" => false, "uzenet" => "Érvénytelen szobakód!"];
        } catch (PDOException $e) {
            return ["siker" => false, "uzenet" => "Hiba: " . $e->getMessage()];
        }
    }
    public function elhagyas($adatok) {
        try {
            // Felhasználó csoport_id törlése
            $update = "UPDATE felhasznalok SET csoport_id = NULL WHERE id = ?";
            $this->kapcsolat->prepare($update)->execute([$adatok->felhasznalo_id]);

            // Eltávolítjuk a csoport_tagok bejegyzést, ha van
            $delete = "DELETE FROM csoport_tagok WHERE felhasznalo_id = ?";
            $this->kapcsolat->prepare($delete)->execute([$adatok->felhasznalo_id]);

            return ["siker" => true];
        } catch (PDOException $e) {
            return ["siker" => false, "uzenet" => "Hiba: " . $e->getMessage()];
        }
    }

    public function adatokLekeres($cs_id) {
        if (!$cs_id) return ["nev" => "Nincs csoport", "kod" => "-"];
        $stmt = $this->kapcsolat->prepare("SELECT nev, kod FROM csoportok WHERE id = ?");
        $stmt->execute([$cs_id]);
        return $stmt->fetch(PDO::FETCH_ASSOC) ?: ["nev" => "Ismeretlen", "kod" => "-"];
    }
}
?>