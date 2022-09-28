UPDATE dbo.[USER]
SET FirstName = @FirstName
   ,LastName = @LastName
WHERE (UserID = @UserID)

