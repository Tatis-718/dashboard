ALTER proc [dbo].[Blogs_SelectAll]
	@PageIndex int
	,@PageSize int

AS

/*
	DECLARE 
		@PageIndex int = 0
		,@PageSize int = 10


	EXECUTE dbo.Blogs_SelectAll
		@PageIndex
		,@PageSize

*/

BEGIN

	DECLARE @offset INT = @PageIndex * @PageSize

	SELECT 
		b.Id
		,Title
		,[Subject]
		,Content
		,IsPublished
		,ImageUrl
		,b.DateCreated
		,b.DateModified
		,b.DatePublish
		,IsDeleted
		,BlogTypeId

		,bt.[Name] AS BlogTypeName

		,AuthorId

		,u.FirstName AS AuthorFirstName
		,u.LastName AS AuthorLastName
		,u.AvatarUrl AS AuthorAvatarUrl

		,TotalCount = COUNT(1) OVER()

		FROM [dbo].[Blogs] AS b
		INNER JOIN dbo.Users AS u 
		ON b.AuthorId = u.Id

		INNER JOIN dbo.BlogTypes AS bt
		ON b.BlogTypeId = bt.Id
		AND b.IsDeleted = 0

		ORDER BY b.DateModified DESC
		OFFSET @offSet ROWS
		FETCH NEXT @PageSize ROWS ONLY

END