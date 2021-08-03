const Developer = require('../models/Developer');
const { validNome, validSexo, validIdade, validHobby, validDataNascimento } = require('../../utils/validation');

class DeveloperController {
  async index(req, res) {
    const limit = 10
    const data = req.query
    let page = data.page - 1 || 0

    const developers = await Developer.findAndCountAll({
      limit: limit,
      offset: page * limit
    });

    if (!developers.rows || developers.rows.length === 0) {
      return res.status(400).json({ message: 'Developers not found' })
    }
    return res.status(200).json({ developers, page, limit });
  }

  async show(req, res) {
    const { id } = req.params

    const developer = await Developer.findOne({
      where: {
        id: id
      }
    })

    if (!developer || developer.length == 0) {
      return res.status(400).json({ message: 'Developer not found' })
    }

    return res.status(200).json({ developer });
  }

  async store(req, res) {
    const { nome, sexo, idade, hobby, datanascimento } = req.body;
    console.log(nome, sexo, idade, hobby, datanascimento)
    try {
      validNome(nome, 'Invalid name! Type at least 4 letters')
      validSexo(sexo, 'Sexo not specified!')
      validIdade(idade, 'Age not specified!')
      validHobby(hobby, 'Invalid hobby! Type at least 4 letters')
      validDataNascimento(datanascimento, idade, 'Invalid birth date, does not match the informed age!')

      const developer = await Developer.create({ nome, sexo, idade, hobby, datanascimento });

      return res.status(201).json({ developer })
    } catch (msg) {
      return res.status(400).json({ message: msg })
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { nome, sexo, idade, hobby, datanascimento } = req.body;

    const developerId = await Developer.findOne({
      where: {
        id: id
      }
    })

    if (!developerId || developerId.length == 0) {
      return res.status(400).json({ message: 'Developer not found' })
    }

    try {
      validNome(nome, 'Invalid name! Type at least 4 letters')
      validSexo(sexo, 'Sexo not specified!')
      validIdade(idade, 'Idade not specified!')
      validHobby(hobby, 'Invalid hobby! Type at least 4 letters')
      validDataNascimento(datanascimento, idade, 'Invalid birth date, does not match the informed age')

      const developer = await Developer.update({ nome, sexo, idade, hobby, datanascimento }, {
        where: {
          id: id
        }
      })

      return res.status(200).json({ developer })
    } catch (msg) {
      return res.status(400).json({ message: msg })
    }
  }

  async destroy(req, res) {
    const { id } = req.params

    const developer = await Developer.destroy({
      where: {
        id: id
      }
    })

    if (!developer || developer.length == 0) {
      return res.status(400).json({ message: 'Developer not found' })
    }

    return res.status(204).json({ developer })
  }
};

module.exports = new DeveloperController()



