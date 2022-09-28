
CREATE TABLE app001.dbo.[USER] (
  UserId BIGINT IDENTITY
 ,NickName VARCHAR(40) NULL
 ,FirstName VARCHAR(40) NOT NULL
 ,LastName VARCHAR(40) NULL
 ,Email VARCHAR(120) NOT NULL
 ,Password NVARCHAR(128) NOT NULL
 ,CONSTRAINT PK_user_UserId PRIMARY KEY CLUSTERED (UserId)
) ON [PRIMARY]
GO
BEGIN
  -- use 1234
  INSERT INTO dbo.[USER] (NickName, FirstName, LastName, Email, [Password])
  VALUES ('admin', 'Administrator', 'System', 'admin', 'U2FsdGVkX1/voegCIfsS+WSNuML+eZ3brYktdeFaQgA=');
END