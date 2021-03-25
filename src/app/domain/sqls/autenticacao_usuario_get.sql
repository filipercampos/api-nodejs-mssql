SELECT TOP 1
  CodigoUsuario,
  NomeUsuario,
  Email 
FROM Usuario WITH (NOLOCK)
WHERE (Email = @Email)