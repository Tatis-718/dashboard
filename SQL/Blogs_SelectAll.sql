USE [MoneFi]
GO
/****** Object:  StoredProcedure [dbo].[Blogs_SelectAll]    Script Date: 7/3/2023 8:05:06 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Tatis Rosario, Mendenzon
-- Create date: 09 JUNE 2023 05:40PST
-- Description: BLOGS PAGINATED SELECT ALL
-- Code Reviewer:

-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

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