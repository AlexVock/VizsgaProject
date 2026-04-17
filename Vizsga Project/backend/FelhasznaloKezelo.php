<?php
class FelhasznaloKezelo {
    private $kapcsolat;
    private $tabla = "felhasznalok";

    public function __construct($db) {
        $this->kapcsolat = $db;
    }

    public function regisztracio($adatok) {
        try {
            if (!$adatok || empty($adatok->email) || empty($adatok->jelszo)) {
                return ["siker" => false, "uzenet" => "Minden mezőt tölts ki!"];
            }

            $stmt = $this->kapcsolat->prepare("SELECT id FROM " . $this->tabla . " WHERE email = :email");
            $stmt->bindParam(":email", $adatok->email);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                return ["siker" => false, "uzenet" => "Ez az email már foglalt!"];
            }

            $query = "INSERT INTO " . $this->tabla . " (nev, email, jelszo) VALUES (:nev, :email, :jelszo)";
            $ins = $this->kapcsolat->prepare($query);
            $hash = password_hash($adatok->jelszo, PASSWORD_BCRYPT);

            $ins->bindParam(":nev", $adatok->nev);
            $ins->bindParam(":email", $adatok->email);
            $ins->bindParam(":jelszo", $hash);

            return $ins->execute() ? ["siker" => true] : ["siker" => false, "uzenet" => "Mentési hiba."];
        } catch(Exception $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }

    public function bejelentkezes($adatok) {
        try {
            if (!$adatok || empty($adatok->email) || empty($adatok->jelszo)) {
                return ["siker" => false, "uzenet" => "Hiányzó adatok!"];
            }

            $stmt = $this->kapcsolat->prepare("SELECT * FROM " . $this->tabla . " WHERE email = :email LIMIT 1");
            $stmt->bindParam(":email", $adatok->email);
            $stmt->execute();

            if($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if(password_verify($adatok->jelszo, $user['jelszo'])) {
                    unset($user['jelszo']);
                    return ["siker" => true, "felhasznalo" => $user];
                }
            }
            return ["siker" => false, "uzenet" => "Hibás email vagy jelszó!"];
        } catch(Exception $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }
}
?>