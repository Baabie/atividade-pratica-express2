import express from 'express'
import cors  from 'cors'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors())

app.use(express.json())


let carros = []
let pessoas = []
let proximoId = 1
let proximoIdPessoa = 1

app.put('/carros/:idBuscado', (req, res) => {
    const modeloCarro = req.body.modeloCarro
    const marcaCarro = req.body.marcaCarro
    const anoCarro = Number(req.body.anoCarro)
    const corCarro = req.body.corCarro
    const precoCarro = req.body.precoCarro

    const idBuscado = Number(req.params.idBuscado)

    if(!idBuscado) {
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se o ID esta correto'}))
        return
    }

    const idVerificado = carros.findIndex(carro => carro.id === idBuscado);

    if(idVerificado === -1) {
        res.status(400).send(JSON.stringify({Menssagem: 'Id de carro não encontrado'}))
        return
    }

    if (!modeloCarro){
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se passou o modelo certo do carro a ser atualizado'}))
        return
    }

    if(!marcaCarro){
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se passou a marca certa do carro a ser atualizado'}))
        return
    }

    if(!anoCarro){
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se passou o ano certo do carro a ser atualizado'}))
        return
    }

    if(!precoCarro) {
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se o preço do carro esta correto a ser atualizado'}))
        return
    }

    if(!corCarro){
        res.status(400).send(JSON.stringify({Menssagem: 'Verifique se a cor do carro esta correta a ser atualizado'}))
        return
    }

    if(idVerificado === -1){
        const carro = carros[idVerificado]
        carro.modeloCarro = modeloCarro
        carro.marcaCarro = marcaCarro
        carro.anoCarro = anoCarro
        carro.precoCarro = precoCarro
        carro.corCarro = corCarro

        res.status(200).send(JSON.stringify({Menssagem: ` Carro ${carro.modeloCarro} atualizado com sucesso`, Dados: carro}))
    }

})


//----------------------------------Deletar-----------------------------------

app.delete('/carros/:idBuscado', (req, res) => {
    const idBuscado = Number(request.params.idBuscado)


if(!idBuscado) {
    res.status(400).send(JSON.stringify({
        Menssagem: 'Verifique se passou corretamente na busca o Id do carro'
    }))
    return
}

const idVerificado = carros.findIndex(carro => carro.id === idBuscado)

if (!idVerificado === -1){
    res.status(400).send(JSON.stringify({
        Menssagem: 'Identificador ID do carro não encontrado no nosso banco de dados'
    }))
    return
}else{
    carros.splice(idVerificado, 1)

    response.status(200).send(JSON.stringify({
        Menssagem: 'Carro deletado com sucesso!'
        }))
    }
})

//---------------------------------CRIAR--------------------------------------

app.post('/signup',async(req, res) => {
    const {nome, email, senha} = req.body

    if(!nome){
        res.status(400).json({
            Menssagem: 'Verifique se você passou um nome de usuário válido'
        })
    }

    if(!email){
        res.status(400).json({
            Menssagem: 'Verifique se você passou o email de usuário válido'
        })
    }

    if(!senha){
        res.status(400).json({
            Menssagem: 'Verifique se você passou a senha de usuário válida'
        })
    }

    const senhaHasheada = await bcrypt.hash(senhaPessoaUsuaria, 10)

    const novaPessoaUsuaria = {
        id: proximoId,
        nome: nome,
        email: email,
        senha: senhaHasheada
    }

    pessoas.push(novaPessoaUsuaria)

    proximoId++

    res.status(201).json({
        sucess: true,
        message: 'Pessoa usuária cadastrada com sucesso'
    })

})

//--------------------------------LOGIN---------------------------------------
app.put('/login', async (req, res) => {
    const emailUsuario = req.body.emailUsuario
    const senhaPessoaUsuaria = req.body.senhaPessoaUsuaria

    if(!senhaPessoaUsuaria) {
        return res.status(400).json({
            Menssagem: 'Senha inválida'
        })
    }

    if(!emailUsuario) {
        return res.status(400).json({
            Menssagem: 'Passe um email válido'
        })
    }

    const pessoaBuscada = pessoa.find( pessoa => pessoa.emailUsuario === emailUsuario)

    if(!pessoaBuscada) {
        return res.status(400).json({
            Menssagem: 'Usuário não encontrado no nosso banco de dados, Verifique o e-mail passado.'
        })
    }

    const senhaEncontrada = await bcrypt.compare(senhaPessoaUsuaria, pessoaBuscada.senhaPessoaUsuaria)

    if(!senhaEncontrada){
        return response.status(400).json({
            Menssagem: 'Credenciais inválidas'
        })
    }

    res.status(200).json({
        message: 'Login bem-sucedido',
        userId: pessoaBuscada.id
    })
})
app.listen(3333, () => console.log("Servidor rodando na porta 3333"))