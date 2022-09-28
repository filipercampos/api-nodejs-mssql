INSERT INTO dbo.[USER] (NickName, FirstName, LastName, Email, [Password])
VALUES (@NickName, @FirstName, @LastName, @Email, @Password)

SELECT SCOPE_IDENTITY()