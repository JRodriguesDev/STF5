const express = require('express');
const cors = require('cors');  // Importa o cors
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongoUrl = 'mongodb+srv://gamesplayfree11:EVXWCKBMdpl7MjcV@jogadores.dqmoa.mongodb.net/?retryWrites=true&w=majority&appName=Jogadores';
const app = express();

app.use(cors());  // Adiciona o CORS para permitir requisições de qualquer origem
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

const players = mongoose.model('players', {
    name: String,
    userName: String,
    turma: String
});

// Rota POST para salvar jogador
app.post('/savePlayers', async (req, res) => {
    try {
        const player = new players({
            name: req.body.name,
            userName: req.body.userName,
            turma: req.body.turma
        });
        await player.save();
        res.status(201).json({ message: 'Jogador salvo com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao salvar o jogador', error });
    }
});

// Rota GET para obter todos os jogadores
app.get('/allPlayers', async (req, res) => {
    try {
        const allPlayers = await players.find();
        res.status(200).json(allPlayers);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os jogadores', error });
    }
});

// Rota principal
app.get('/', (req, res) => {
    res.send('API ON');
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
