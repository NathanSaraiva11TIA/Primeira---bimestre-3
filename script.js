const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'alunos_filmes_03MA',
  waitForConnections: true
});

app.get('/filmes', async (req, res) => {
  const conn = await pool.getConnection();
  const [filmes] = await conn.query('SELECT * FROM filmes_Nathan_MariaClara');
  res.json(filmes);
  conn.release();
});

app.post('/filmes', async (req, res) => {
  const { titulo, genero, duracao, classificacao_etaria } = req.body;
  const conn = await pool.getConnection();
  await conn.query('INSERT INTO filmes_Nathan_MariaClara (titulo, genero, duracao, classificacao_etaria) VALUES (?, ?, ?, ?)', 
    [titulo, genero, duracao, classificacao_etaria]);
  res.json({ mensagem: 'Filme adicionado' });
  conn.release();
});

app.put('/filmes/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, genero, duracao, classificacao_etaria } = req.body;
  const conn = await pool.getConnection();
  await conn.query('UPDATE filmes_Nathan_MariaClara SET titulo = ?, genero = ?, duracao = ?, classificacao_etaria = ? WHERE id = ?',
    [titulo, genero, duracao, classificacao_etaria, id]);
  res.json({ mensagem: 'Filme atualizado' });
  conn.release();
});

app.delete('/filmes/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await pool.getConnection();
  await conn.query('DELETE FROM filmes_Nathan_MariaClara WHERE id = ?', [id]);
  res.json({ mensagem: 'Filme removido' });
  conn.release();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));