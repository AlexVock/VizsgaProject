<?php
class BevasarlasKezelo {
    private $kapcsolat;

    public function __construct($db) {
        $this->kapcsolat = $db;
    }

    public function listazas($csoport_id) {
        $query = "SELECT * FROM bevasarlo_lista WHERE csoport_id = :id ORDER BY id DESC";
        $utasitas = $this->kapcsolat->prepare($query);
        $utasitas->bindParam(":id", $csoport_id);
        $utasitas->execute();
        return $utasitas->fetchAll(PDO::FETCH_ASSOC);
    }

    public function hozzaadas($adatok) {
        $query = "INSERT INTO bevasarlo_lista (csoport_id, termek_nev, hozzaadta_id) 
                  VALUES (:cs_id, :nev, :f_id)";
        $utasitas = $this->kapcsolat->prepare($query);
        $utasitas->bindParam(":cs_id", $adatok->csoport_id);
        $utasitas->bindParam(":nev", $adatok->termek_nev);
        $utasitas->bindParam(":f_id", $adatok->felhasznalo_id);
        
        if($utasitas->execute()) {
            return ["siker" => true];
        }
        return ["siker" => false];
    }
}
?>