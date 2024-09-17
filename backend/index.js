const express = require('express');
const useRouter = require('./src/routes/user');

const app = express();

app.use(express.json());

app.use("/api/v1/user", useRouter )

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});