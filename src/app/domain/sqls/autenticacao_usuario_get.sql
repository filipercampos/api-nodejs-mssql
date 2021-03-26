SELECT TOP 1
  UsuarioID,
  Nome,
  Email 
FROM Usuario
WHERE (Email = @Email AND Senha = @Senha)