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
                // Debug: log attempt (do not log plaintext in production)
                $log = sprintf("[%s] LOGIN attempt for %s: stored_hash=%s\n", date('c'), $adatok->email, substr($user['jelszo'],0,30));
                @file_put_contents(__DIR__ . '/login_debug.log', $log, FILE_APPEND);

                if(password_verify($adatok->jelszo, $user['jelszo'])) {
                    unset($user['jelszo']);
                    @file_put_contents(__DIR__ . '/login_debug.log', "[OK]\n", FILE_APPEND);
                    return ["siker" => true, "felhasznalo" => $user];
                } else {
                    @file_put_contents(__DIR__ . '/login_debug.log', "[PW_FAIL]\n", FILE_APPEND);
                }
            }
            return ["siker" => false, "uzenet" => "Hibás email vagy jelszó!"];
        } catch(Exception $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }

    public function profilFrissites($adatok) {
        try {
            if (!$adatok || !isset($adatok->id)) return ["siker" => false, "uzenet" => "Hiányzó felhasználó ID"];

            $fields = [];
            $params = [];

            if (isset($adatok->nev)) { $fields[] = "nev = :nev"; $params[':nev'] = $adatok->nev; }
            if (isset($adatok->szin)) { $fields[] = "profil_szin = :szin"; $params[':szin'] = $adatok->szin; }
            if (isset($adatok->email)) { $fields[] = "email = :email"; $params[':email'] = $adatok->email; }
            if (isset($adatok->jelszo) && $adatok->jelszo !== '') {
                $hash = password_hash($adatok->jelszo, PASSWORD_BCRYPT);
                $fields[] = "jelszo = :jelszo"; $params[':jelszo'] = $hash;
            }

            if (count($fields) === 0) return ["siker" => false, "uzenet" => "Nincs frissítendő mező"];

            $sql = "UPDATE " . $this->tabla . " SET " . implode(', ', $fields) . " WHERE id = :id";
            $params[':id'] = $adatok->id;
            $stmt = $this->kapcsolat->prepare($sql);
            $res = $stmt->execute($params);
            if ($res) {
                $stmt = $this->kapcsolat->prepare("SELECT id, nev, email, profil_szin, csoport_id FROM " . $this->tabla . " WHERE id = :id LIMIT 1");
                $stmt->execute([':id' => $adatok->id]);
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                return ["siker" => true, "felhasznalo" => $user];
            }
            return ["siker" => false, "uzenet" => "Frissítés sikertelen"];
        } catch (Exception $e) {
            return ["siker" => false, "uzenet" => $e->getMessage()];
        }
    }
}
?>