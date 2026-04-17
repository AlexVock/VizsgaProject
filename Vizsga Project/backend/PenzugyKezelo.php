<?php
class PenzugyKezelo {
    private $kapcsolat;
    private $tabla = "penzugyek";

    public function __construct($db) {
        $this->kapcsolat = $db;
    }

    public function listazas($cs_id) {
        $query = "SELECT p.*, f.nev FROM " . $this->tabla . " p 
                  JOIN felhasznalok f ON p.felhasznalo_id = f.id 
                  WHERE p.csoport_id = :id 
                  ORDER BY p.datum DESC";
        $stmt = $this->kapcsolat->prepare($query);
        $stmt->execute(['id' => $cs_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function hozzaadas($adatok) {
        $query = "INSERT INTO " . $this->tabla . " (csoport_id, felhasznalo_id, megnevezes, osszeg, kategoria) 
                  VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->kapcsolat->prepare($query);
        return $stmt->execute([
            $adatok->csoport_id, 
            $adatok->felhasznalo_id, 
            $adatok->megnevezes, 
            $adatok->osszeg,
            $adatok->kategoria
        ]) ? ["siker" => true] : ["siker" => false];
    }

    public function szerkesztes($adatok) {
        $query = "UPDATE " . $this->tabla . " SET megnevezes = ?, osszeg = ?, kategoria = ? WHERE id = ?";
        $stmt = $this->kapcsolat->prepare($query);
        return $stmt->execute([
            $adatok->megnevezes, 
            $adatok->osszeg, 
            $adatok->kategoria, 
            $adatok->id
        ]) ? ["siker" => true] : ["siker" => false];
    }

    public function torles($id) {
        $query = "DELETE FROM " . $this->tabla . " WHERE id = :id";
        $stmt = $this->kapcsolat->prepare($query);
        return $stmt->execute(['id' => $id]) ? ["siker" => true] : ["siker" => false];
    }
}
?>