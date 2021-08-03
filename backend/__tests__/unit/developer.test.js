const request = require('supertest');

const app = require('../../src/app');
const Developer = require('../../src/app/models/Developer');
const truncate = require('../../utils/truncate');

describe('Search /GET developers', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('Espera-se que retorne um status 400 por não haver um Developer no Banco de Dados', async () => {
        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(400)
    })

    it('Espera-se que retorne um status 200 após criar um Developer no Banco de Dados', async () => {
        console.log(Developer)
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .get("/developers")

        expect(response.status).toBe(200)
    })

    it('Espera-se que retorne um status 400 após passar uma paginação inexistente', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .get("/developers?page=2")

        expect(response.status).toBe(400)
    })

    it('Espera-se que retorne um status 400 após passar uma paginação existente', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .get("/developers?page=1")

        expect(response.status).toBe(200)
    })
  })

describe('Search /GET developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um parametro id que nao existe no banco de dados', async () => {
        const response = await request(app)
            .get("/developers/1")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um parametro id que existe no banco de dados', async () => {
        const developer = await Developer.create({
               nome: "Bruno Silva",
               sexo: "M",
               idade: 23,
               hobby: "Programar e Jogar",
               datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .get(`/developers/${developer.id}`)

        expect(response.status).toBe(200)
    })
})

describe('Create /POST developers', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com nome em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "",
                sexo: "M",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com sexo em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com idade em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: '',
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com hobby em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar com datanascimento em branco', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: ""
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar name com menos de 3 caracteres', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "br",
                sexo: "M",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar hobby com menos de 5 caracteres', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Prog",
                datanascimento: "03-06-2003"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para salvar a datanascimento incompatível com a idade', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1999"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um desenvolvedor para salvar', async () => {
        const response = await request(app)
            .post("/developers")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(201)
    })
})

describe('Update /PUT developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um update de desenvolvedor com id que nao existe no banco de dados', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/2")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com nome em branco', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "",
                sexo: "M",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com sexo em branco', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com idade em branco', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: '',
                hobby: "Programar, Correr e Jogar",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com hobby em branco', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar com datanascimento em branco', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: ""
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar name com menos de 3 caracteres', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "ma",
                sexo: "M",
                idade: 19,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para atualizar hobby com menos de 5 caracteres', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Prog",
                datanascimento: "1998-04-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 400 apos enviar um desenvolvedor para ataulizar a datanascimento incompativel com a idade', async () => {
        await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .put("/developers/1")
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "2003-06-03"
            })

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um desenvolvedor para atualizar', async () => {
        const developer = await Developer.create({
            nome: "Bruno Silva",
            sexo: "M",
            idade: 23,
            hobby: "Programar e Jogar",
            datanascimento: "03-04-1998"
        })

        const response = await request(app)
            .put(`/developers/${developer.id}`)
            .send({
                nome: "Bruno Silva",
                sexo: "M",
                idade: 23,
                hobby: "Programar, Correr e Jogar",
                datanascimento: "03-04-1998"
            })

        expect(response.status).toBe(200)
    })
})

describe('Delete /delete developers/{id}', () => {
    beforeEach(async () => {
        await truncate()
    })

    it('espera que retorne um status 400 apos enviar um parametro id que nao existe no banco de dados', async () => {
        const response = await request(app)
            .delete("/developers/1")

        expect(response.status).toBe(400)
    })

    it('espera que retorne um status 200 apos enviar um parametro id que existe no banco de dados', async () => {
        const developer = await Developer.create({
               nome: "Bruno Silva",
               sexo: "M",
               idade: 23,
               hobby: "Programar e Jogar",
               datanascimento: "1998-04-03"
        })

        const response = await request(app)
            .delete(`/developers/${developer.id}`)

        expect(response.status).toBe(204)
    })
})