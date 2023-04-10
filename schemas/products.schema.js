module.exports = {
    type: "object",
    properties: {
        nome: {type: "string",},
        descricao: {type: "string"},
        preco: {type: "string"},
        tags: {type: "array"},
        imagem: {type: "array"}
    },
    required: ["nome", "preco","descricao"],
    additionalProperties: false
}