const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

// Configuração da conexão com o banco de dados
const con = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'stockcar'
});

con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Função de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
};

//clientes
const createclientes = (req, res) => {
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro} =req.body;

    const query = 'INSERT INTO clientes (nome, cpf, email, endereco, data_nascimento, data_cadastro) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro], (err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.status(201).json({message: 'cliente Criado com sucesso', result});
        }

    });
}


const readclientes = (req, res) => {
    con.query("SELECT * FROM clientes",(err,result) => {
        if(err) {
            res.status(500).json({error: err.message});
        } else {
            res.json(result);
        }
    });
}


const updateclientes = (req, res) => {
    const {nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id} = req.body;

    const query = 'UPDATE clientes SET nome = ?, cpf = ?, email = ?, endereco = ?, data_nascimento = ?, data_cadastro = ? WHERE cliente_id = ?'
    con.query(query, [nome, cpf, email, endereco, data_nascimento, data_cadastro, cliente_id], (err, result)=>{
        if(err) {
            res.status(500).json({error: err.message});
        }else {
            res.json({message:'clientes atualizado com sucesso', result});
        }
    });
}



const deleteclientes = (req, res) => {
    let cliente_id = Number(req.params.cliente_id)

const query = `DELETE FROM clientes WHERE cliente_id = ${cliente_id}`;
    con.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'clientes removido com sucesso', result });
        }
    });
};




// CRUD - carros
const createcarros = (req, res) => {
    const { carros_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = 'INSERT INTO carros (carros_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id) VALUES(?, ?, ?, ?, ?, ?)';
    con.query(query, [carros_id, marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'carros criado com sucesso', result });
        }
    });
};

const readcarros = (req, res) => {
    con.query("SELECT * FROM carros", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatecarros = (req, res) => {
    const {marca_veiculo, modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id } = req.body;

    const query = 'UPDATE carros SET modelo_veiculo = ?, ano_veiculo = ?, fabricacao_veiculo = ?, cliente_id = ?  WHERE marca_veiculo = ?';
    con.query(query, [modelo_veiculo, ano_veiculo, fabricacao_veiculo, cliente_id, marca_veiculo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'carros atualizado com sucesso', result });
        }
    });
};

const deletecarros = (req, res) => {
    const { carros_id } = req.params;

    const query = 'DELETE FROM carros WHERE carros_id = ?';
    con.query(query, [carros_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'carros removido com sucesso', result });
        }
    });
};


// CRUD - telefone
const createtelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo } = req.body;

    const query = 'INSERT INTO telefone (telefone_id, cliente_id, numero, tipo) VALUES(?, ?, ?, ?)';
    con.query(query, [telefone_id, cliente_id, numero, tipo], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'telefone criado com sucesso', result });
        }
    });
};

const readtelefone = (req, res) => {
    con.query("SELECT * FROM telefone", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
};

const updatetelefone = (req, res) => {
    const { telefone_id, cliente_id, numero, tipo } = req.body;

    const query = 'UPDATE telefone SET cliente_id = ? , numero = ?, tipo = ? WHERE telefone_id = ?';
    con.query(query, [cliente_id, numero, tipo, telefone_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone atualizado com sucesso', result });
        }
    });
};

const deletetelefone = (req, res) => {
    const { telefone_id } = req.params;

    const query = 'DELETE FROM telefone WHERE telefone_id = ?';
    con.query(query, [telefone_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'telefone removido com sucesso', result });
        }
    });
};



// Inicialização do Express
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", teste);

// Rotas para clientes
app.post("/clientes", createclientes);
app.get("/clientes", readclientes);
app.put("/clientes", updateclientes);
app.delete("/clientes/:cliente_id", deleteclientes);

// Rotas para carros
app.post("/carros", createcarros);
app.get("/carros", readcarros);
app.put("/carros", updatecarros);
app.delete("/carros/:carros_id", deletecarros);

// Rotas para telefone
app.post("/telefone", createtelefone);
app.get("/telefone", readtelefone);
app.put("/telefone", updatetelefone);
app.delete("/telefone/:telefone_id", deletetelefone);

// Inicialização do servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});