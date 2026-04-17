<?php
class ChatKezelo {
    private $kapcsolat;

    public function __construct($db) {
        $this->kapcsolat = $db;
    }

    public function listazas($csoport_id) {
        // Összekötjük az üzeneteket a felhasználók nevével (JOIN)
        $query = "SELECT u.*, f.nev FROM uzenetek u 
                  JOIN felhasznalok f ON u.felhasznalo_id = f.id 
                  WHERE u.csoport_id = :cs_id 
                  ORDER BY u.kuldve ASC LIMIT 50";
        $utasitas = $this->kapcsolat->prepare($query);
        $utasitas->bindParam(":cs_id", $csoport_id);
        $utasitas->execute();
        return $utasitas->fetchAll(PDO::FETCH_ASSOC);
    }

    public function kuldes($adatok) {
        $query = "INSERT INTO uzenetek (csoport_id, felhasznalo_id, szoveg) 
                  VALUES (:cs_id, :f_id, :szoveg)";
        $utasitas = $this->kapcsolat->prepare($query);
        $utasitas->bindParam(":cs_id", $adatok->csoport_id);
        $utasitas->bindParam(":f_id", $adatok->felhasznalo_id);
        $utasitas->bindParam(":szoveg", $adatok->szoveg);
        
        if($utasitas->execute()) {
            return ["siker" => true];
        }
        return ["siker" => false];
    }
}
?>