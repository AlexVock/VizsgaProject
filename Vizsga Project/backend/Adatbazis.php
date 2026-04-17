<?php
class Adatbazis {
    private $host = "localhost";
    private $felhasznalo = "root";
    private $jelszo = "";
    private $adatbazis_nev = "roommate_db";
    public $kapcsolat;

    public function kapcsolodas() {
        $this->kapcsolat = null;
        try {
            $this->kapcsolat = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->adatbazis_nev, $this->felhasznalo, $this->jelszo);
            $this->kapcsolat->exec("set names utf8");
            $this->kapcsolat->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            // Hiba esetén ne adjon ki sima szöveget, mert elrontja a JSON-t
        }
        return $this->kapcsolat;
    }
}
?>