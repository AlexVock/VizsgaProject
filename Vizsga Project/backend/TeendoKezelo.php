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
}
?>