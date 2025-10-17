<?php
if (isset($_POST['submit'])) {
    include_once('conexao.php');

    $usuario = $_POST['usuario'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $cpf = $_POST['cpf'];
    $senha = $_POST['senha'];

    $sql = "INSERT INTO cliente_dado (nome_cli, email_cli, senha_cli, cpf, tel)
            VALUES ('$usuario', '$email', '$senha', '$cpf', '$telefone')";

    $result = mysqli_query($conexao, $sql);

    // Início do HTML da página
    echo '
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <title>Resultado do Cadastro</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: linear-gradient(135deg, #ff4b2b, #ff416c);
                margin: 0;
                color: #fff;
            }
            .mensagem {
                background-color: rgba(255, 255, 255, 0.1);
                border: 2px solid #fff;
                border-radius: 15px;
                padding: 30px 50px;
                text-align: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                animation: aparecer 0.6s ease-in-out;
            }
            .mensagem h2 {
                margin-bottom: 10px;
                font-size: 1.8rem;
            }
            .mensagem p {
                margin: 0;
                opacity: 0.9;
            }
            .sucesso {
                border-color: #00ff99;
                background-color: rgba(0,255,153,0.1);
            }
            .erro {
                border-color: #ff4b2b;
                background-color: rgba(255,75,43,0.1);
            }
            a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 25px;
                border-radius: 8px;
                text-decoration: none;
                background-color: #fff;
                color: #ff416c;
                font-weight: bold;
                transition: 0.3s;
            }
            a:hover {
                background-color: #ff416c;
                color: #fff;
                transform: scale(1.05);
            }
            @keyframes aparecer {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>
    <body>
    ';
    
    if ($result) {
        echo '
        <div class="mensagem sucesso">
            <h2>✅ Cadastro realizado com sucesso!</h2>
            <p>Bem-vindo(a), ' . htmlspecialchars($usuario) . '!</p>
            <a href="cadastro.html">Voltar</a>
        </div>';
    } else {
        echo '
        <div class="mensagem erro">
            <h2>❌ Erro ao cadastrar!</h2>
            <p>' . mysqli_error($conexao) . '</p>
            <a href="cadastro.html">Tentar novamente</a>
        </div>';
    }

    echo '</body></html>';
}
?>
