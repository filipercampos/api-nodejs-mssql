SELECT TOP 1
  UsuarioID,
  NomeUsuario,
  Email 
FROM Usuario WITH (NOLOCK)
WHERE (Email = @Email AND Senha = @Senha)