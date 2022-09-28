SELECT
  UserID,
  NickName,
  FirstName,
  LastName,
  Email,
  [Password] 
FROM dbo.[User] WITH(NOLOCK)
WHERE 1=1
AND (FirstName LIKE @FirstName OR @FirstName IS NULL)
AND (UserID = @UserID OR @UserId IS NULL)

