<?php
class TeendoKezelo {
    private $kapcsolat;
    public function __construct($db) { $this->kapcsolat = $db; }

    public function listazas($cs_id) {
        $stmt = $this->kapcsolat->prepare("SELECT t.*, f.nev FROM teendok t JOIN felhasznalok f ON t.felhasznalo_id = f.id WHERE t.csoport_id = :id ORDER BY t.kesz ASC, t.datum DESC");
        $stmt->execute(['id' => $cs_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function hozzaadas($adatok) {
        $stmt = $this->kapcsolat->prepare("INSERT INTO teendok (csoport_id, felhasznalo_id, feladat) VALUES (?, ?, ?)");
        return $stmt->execute([$adatok->csoport_id, $adatok->felhasznalo_id, $adatok->feladat]) ? ["siker" => true] : ["siker" => false];
    }

    public function frissites($adatok) {
        try {
            if (!isset($adatok->id) || !isset($adatok->kesz)) return ["siker" => false, "uzenet" => "Hiányzó adatok"]; 
            $stmt = $this->kapcsolat->prepare("UPDATE teendok SET kesz = ? WHERE id = ?");
            $result = $stmt->execute([(int)$adatok->kesz, $adatok->id]);
            return $result ? ["siker" => true] : ["siker" => false, "uzenet" => "Frissítés sikertelen"];
        } catch (PDOException $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }

    public function szerkesztes($adatok) {
        try {
            if (!isset($adatok->id) || !isset($adatok->feladat)) return ["siker" => false, "uzenet" => "Hiányzó adatok"];
            $stmt = $this->kapcsolat->prepare("UPDATE teendok SET feladat = ? WHERE id = ?");
            $result = $stmt->execute([$adatok->feladat, $adatok->id]);
            return $result ? ["siker" => true] : ["siker" => false, "uzenet" => "Szerkesztés sikertelen"];
        } catch (PDOException $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }
}
?>