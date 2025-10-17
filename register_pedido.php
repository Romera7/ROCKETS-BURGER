<?php
include('conexao.php');

// Exemplo simples: cliente ID 1 quer 1 X-Burguer (produto ID 1)
$cliente_id = 1;
$data_hora = date("Y-m-d H:i:s");
$status = 'pendente';

// Inserir pedido
$sql_pedido = "INSERT INTO pedidos (cliente_id, data_hora, status) VALUES ($cliente_id, '$data_hora', '$status')";
$conn->query($sql_pedido);
$pedido_id = $conn->insert_id;

// Inserir item do pedido
$produto_id = 1;
$quantidade = 1;
$sql_item = "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES ($pedido_id, $produto_id, $quantidade)";
$conn->query($sql_item);

echo "Pedido registrado com sucesso!";

$conn->close();
?>