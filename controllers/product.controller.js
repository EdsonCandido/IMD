const {Produto, Tag} = require('../models');

exports.findAll = async (req, res) => {
    try {        
        const result = await Produto.findAll({include:  [{model: Tag}]});
        return res.status(200).json({data: result, message: 'OK!'})
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}

exports.findOneById = async (req, res) => {
    try {
        const {FK_PRODUCT} = req.params;
        const result = await Produto.findByPk(FK_PRODUCT ,{include:  [{model: Tag}]});
        return res.status(200).json({data: result, message: 'OK!'})
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}

exports.create = async (req, res) => {
    try {
        const {nome, preco, descricao, tags} = req.body;
        const data = {
            nome, preco, descricao
        }
        const result = await Produto.create(data);
        if(tags.length> 0){
            await Promise.all(await tags.map(async i => {
                let aux = {
                    produtoId: result.id,
                    nome: i
                };
                await Tag.create(aux); 
            }));
        }
        return res.status(201).json({data: result, message: 'OK!'});
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}
exports.upload = async (req, res) => {
    try {
        const file = req.file;
        const {FK_PRODUCT} = req.params;
        const findProduct = await Produto.findByPk(FK_PRODUCT);
        if(!findProduct) throw new Error('Produto não encontrado');

        findProduct.imagem = file.filename;
        const saveQuery = await findProduct.save();

        if(!saveQuery) throw new Error('Não foi possível editar o produto');

        const result = await Produto.findByPk(FK_PRODUCT,{include:  [{model: Tag}]});
        return res.status(201).json({data: result, message: 'OK!'})
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}
exports.update = async (req, res) => {
    try {
        const {FK_PRODUCT} = req.params;
        const {nome, preco, descricao} = req.body;
        const findProduct = await Produto.findByPk(FK_PRODUCT);
        if(!findProduct) throw new Error('Produto não encontrado');

        findProduct.nome = nome;
        findProduct.preco = preco;
        findProduct.descricao = descricao;

        const saveQuery = await findProduct.save();

        if(!saveQuery) throw new Error('Não foi possível editar o produto');

        const result = await Produto.findByPk(FK_PRODUCT,{include:  [{model: Tag}]});
        return res.status(200).json({data: result, message: 'OK!'})
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}

exports.delete = async (req, res) => {
    try {
        const {FK_PRODUCT} = req.params;
        const findProduct = await Produto.findByPk(FK_PRODUCT);
        if(!findProduct) throw new Error('Produto não encontrado');

        const result = await findProduct.destroy();
        return res.status(200).json({data: result, message: 'OK!'})
    } catch (error) {
        return res.status(400).json({data: null, message: error.message});
    }
}