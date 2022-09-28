SELECT TOP 1
  UserID,
  Nickname,
  FirstName,
  LastName,
  Email
FROM dbo.[User]
WHERE (Email = @Email AND [Password] = @Password)