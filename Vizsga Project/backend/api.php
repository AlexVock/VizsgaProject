<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=UTF-8");

include_once 'Adatbazis.php';
include_once 'FelhasznaloKezelo.php';
include_once 'PenzugyKezelo.php';
include_once 'CsoportKezelo.php';
include_once 'TeendoKezelo.php';
include_once 'ChatKezelo.php';

$dbObj = new Adatbazis();
$db = $dbObj->kapcsolodas();
$muvelet = $_GET['muvelet'] ?? '';
$adatok = json_decode(file_get_contents("php://input"));

$valasz = ["siker" => false, "uzenet" => "Ismeretlen muvelet"];

if ($db) {
    switch ($muvelet) {
        case 'bejelentkezes':
            $valasz = (new FelhasznaloKezelo($db))->bejelentkezes($adatok);
            break;
        case 'regisztracio':
            $valasz = (new FelhasznaloKezelo($db))->regisztracio($adatok);
            break;
        case 'csoport_letrehozas':
            $valasz = (new CsoportKezelo($db))->letrehozas($adatok);
            break;
        case 'csoport_csatlakozas':
            $valasz = (new CsoportKezelo($db))->csatlakozas($adatok);
            break;
        case 'csoport_adatok':
            $valasz = (new CsoportKezelo($db))->adatokLekeres($_GET['csoport_id']);
            break;
        case 'penzugy_listazas':
            $valasz = (new PenzugyKezelo($db))->listazas($_GET['csoport_id']);
            break;
        case 'penzugy_mentes':
            $valasz = (new PenzugyKezelo($db))->hozzaadas($adatok);
            break;
        case 'penzugy_szerkesztes':
            $valasz = (new PenzugyKezelo($db))->szerkesztes($adatok);
            break;
        case 'penzugy_torles':
            $valasz = (new PenzugyKezelo($db))->torles($_GET['id']);
            break;
    }
} else {
    $valasz = ["siker" => false, "uzenet" => "Nincs adatbázis kapcsolat"];
}

echo json_encode($valasz);
?>