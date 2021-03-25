
module.exports = {
    toModel: (json) => {
        return {
            "id": json["UsuarioId"],
            "nomeUsuario": json["NomeUsuario"],
            "email": json["Email"],
        }
    }
};
