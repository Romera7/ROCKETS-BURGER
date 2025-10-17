<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$dbname = "tcc_hamburgueria"; // nome real do seu banco

$conexao = new mysqli($servidor, $usuario, $senha, $dbname);

if ($conexao->connect_error) {
    die("Falha na conexão: " . $conexao->connect_error);
}
?>
