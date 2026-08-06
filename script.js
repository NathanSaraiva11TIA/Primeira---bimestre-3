import express from "express"
import mysql2 from "mysql2"

const database = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "alunos",
    password: "senhaAlunos",
    database: "alunos_filmes_03MA"
})


const app = express()

app.use(express.json())

app.get("/all-movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_Nathan_MariaClara"

    database.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})


app.post("/add-movie", (request, response) => {
    const { titulo, genero, duraçao, classificaçao_etaria } = request.body

    const insertCommand = 
        "INSERT INTO filmes_Nathan_MariaClara(titulo, genero, duraçao, classificaçao_etaria) VALUES (?, ?, ?, ?)"

    database.query(insertCommand, [titulo, genero, duraçao, classificaçao_etaria], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.status(201).json({
                message: "Filme adicionado com sucesso!"
            })
        }
    })
})

app.delete("/delete-movie/:id", (request, response) => {

    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_Nathan_MariaClara WHERE id=?"

    database.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Filme apagado com sucesso!"
            })
        }
    })

})

app.put("/update-movie/:id", (request, response) => {
    const { id } = request.params
    const { titulo, genero, duraçao, classificaçao_etaria } = request.body

    const updateCommand = 
        "UPDATE filmes_Nathan_MariaClara SET titulo = ?, genero = ?, duraçao = ?, classificaçao_etaria = ? WHERE id = ?"

    database.query(updateCommand, [titulo, genero, duraçao, classificaçao_etaria, id], (error) => {
        if (error) {
            console.log(error)
        } else {
            response.json({
                message: "Informações do filme atualizadas com sucesso!"
            })
        }
    })
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
})                                         
