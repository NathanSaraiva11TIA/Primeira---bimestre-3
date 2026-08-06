import express from "express"
import mysql2 from "mysql2"

const app = express();

app.use(express.json());

const pool = mysql.createPool({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'alunos_filmes_03MA',
  waitForConnections: true
});

app.get('/filmes', (request, response) => {
  const conn = pool.getConnection();
  const selectCommand = database.query('SELECT * FROM filmes_Nathan_MariaClara');
  
  database.query(selectCommand, (error,data) => {
    if (error) {
      console.log(error)
      return
    }
    response.json(data);
  })
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
  const { id } = request.params;
  const selectCommand = database.query('SELECT * FROM filmes_Nathan_MariaClara');
  const task = await sql.promise().query(selectCommand, [id], (error, data) => {
    if (error) {
      console.log(error)
      return
    }

    updateCommand = database.query('UPDATE * FROM filmes_Nathan_MariaClara')
  })
});

app.delete('/filmes/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await pool.getConnection();
  await conn.query('DELETE FROM filmes_Nathan_MariaClara WHERE id = ?', [id]);
  res.json({ mensagem: 'Filme removido' });
  conn.release();
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));