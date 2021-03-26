
module.exports = {
    toModel: (json) => {
        return {
            "id": json["UsuarioId"],
            "nome": json["Nome"],
            "email": json["Email"],
        }
    }
};
