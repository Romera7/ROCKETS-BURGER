	Create Database TCC_HAMBURGUERIA;

	Use TCC_HAMBURGUERIA;

CREATE TABLE cliente_dado
(
id_cli INT PRIMARY KEY,
nome_cli VARCHAR(60) NOT NULL,
email_cli VARCHAR(100),
senha_cli VARCHAR(100),
cpf VARCHAR(11) NOT NULL,
tel VARCHAR(11) NOT NULL
);

    
CREATE TABLE cliente_endereco
(
    id_endereco INT PRIMARY KEY AUTO_INCREMENT,
    id_cli INT NOT NULL, 
    FOREIGN KEY (id_cli) REFERENCES cliente_dado(id_cli),
    cidade VARCHAR(60) NOT NULL,
    bairro VARCHAR(100),
    rua VARCHAR(100),
    num_casa INT,
    complemento VARCHAR(100)
);

	create table admin
	(
	id_adm int primary key auto_increment,
	nome_adm varchar(50),
	senha_log_adm varchar(50)
	);

	create table produto
	(
	id_produto int primary key auto_increment,
	nome_prod varchar(60) not null,
	descricao varchar(500),
	preco_venda float(10,2) not null,
	adicionais varchar(500),
	tipo_prod varchar(100)
	);

	create table venda
	( 
	id_venda int primary key auto_increment,
	id_cli int not null, foreign key(id_cli) references cliente(id_cli),
	vl_total decimal(10,2) not null,
	data_pedido date,
	horario time,
	status_pedido varchar(15)
	);


	create table item_pedido
	(
	id_item int primary key auto_increment,
	id_venda int not null,
	foreign key(id_venda) references venda(id_venda),
	id_produto int not null,
	foreign key(id_produto) references produto(id_produto),
	quantidade int not null,
	total decimal(10,2) not null
	);


	CREATE TABLE pagamento 
	(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	descricao TEXT,
	aceita_troco BOOLEAN DEFAULT FALSE,
	ativo BOOLEAN DEFAULT TRUE
	);
    
    CREATE TABLE pagamento 
(
    id_pag SERIAL PRIMARY KEY,
    id_venda INT NOT NULL, 
    FOREIGN KEY(id_venda) REFERENCES venda(id_venda),
    nome VARCHAR(50) NOT NULL,
    descricao TEXT,
    aceita_troco BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE
    
);



INSERT INTO cliente (id_cli, nome_cli, email_cli, senha_cli, cpf, tel, cidade, bairro, rua, num_casa, complemento) VALUES
(1, 'João Silva', 'joao@email.com', 'senha123', '12345678901', '11999999999', 'São Paulo', 'Centro', 'Rua A', 100, 'Apto 101'),
(2, 'Maria Oliveira', 'maria@email.com', 'senha456', '98765432100', '11988888888', 'Rio de Janeiro', 'Copacabana', 'Rua B', 200, NULL),
(3, 'Charllene', 'charzinha@email.com', 'senha456', '98765432100', '11988888888', 'Rio de Janeiro', 'Copacabana', 'Rua B', 200, NULL);

INSERT INTO produto (nome_prod, descricao, preco_venda, adicionais, tipo_prod) VALUES
('Pizza Margherita', 'Pizza tradicional com molho de tomate, mussarela e manjericão', 30.00, NULL, 'Pizza'),
('Refrigerante Cola', 'Lata de refrigerante cola 350ml', 5.00, NULL, 'Bebida');


INSERT INTO venda (id_cli, vl_total, data_pedido, horario, status_pedido) VALUES
(1, 65.00, '2025-08-07', '19:30:00', 'Em preparo'),
(2, 35.00, '2025-08-07', '20:00:00', 'Entregue'),
(3, 35.00, '2025-08-07', '20:00:00', 'Entregue');


INSERT INTO item_pedido (id_venda, id_produto, quantidade, total) VALUES
(1, 1, 2, 60.00), -- 2 pizzas margherita
(1, 2, 1, 5.00),  -- 1 refrigerante cola
(2, 1, 1, 30.00), -- 1 pizza margherita
(2, 2, 1, 5.00),  -- 1 refrigerante cola
(3, 2, 3, 5.00);  -- 1 refrigerante cola

INSERT INTO pagamento (nome, descricao, aceita_troco, ativo) VALUES
('Dinheiro', 'Pagamento em espécie', TRUE, TRUE),
('Cartão de Crédito', 'Transação via cartão de crédito', FALSE, TRUE),
('Cartão de Débito', 'Transação via cartão de débito', FALSE, TRUE),
('PIX', 'Pagamento via PIX (instantâneo)', FALSE, TRUE),
('Vale Refeição', 'Cartões de alimentação (Sodexo, Alelo, etc.)', FALSE, TRUE),
('QR Code (Carteiras Digitais)', 'Ex: Mercado Pago, PicPay', FALSE, TRUE),
('Transferência Bancária', 'TED/DOC ou transferência entre contas', FALSE, FALSE),
('Comanda ou Conta Mensal', 'Pagamento a prazo para clientes cadastrados', FALSE, FALSE),
('Cupom/Crédito da Loja', 'Crédito gerado por devoluções ou promoções', TRUE, FALSE);


SELECT 
    v.id_venda AS numero_nota,
    c.nome_cli AS cliente,
    c.cidade,
    c.bairro,
    c.rua,
    c.num_casa,
    pr.nome_prod AS produto,
    pr.descricao,
    ip.quantidade,
    ip.total AS total_item,
    v.data_pedido,
    v.horario,
    v.status_pedido,
    v.vl_total AS total_geral
FROM venda v
JOIN cliente c ON v.id_cli = c.id_cli
JOIN item_pedido ip ON ip.id_venda = v.id_venda
JOIN produto pr ON ip.id_produto = pr.id_produto
WHERE v.id_venda = 3;
