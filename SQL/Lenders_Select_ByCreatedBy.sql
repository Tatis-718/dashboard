ALTER PROCEDURE [dbo].[Lenders_SelectByCreatedBy]
    @CreatedBy int,
    @PageIndex int,
    @PageSize int
AS

/*
EXEC [dbo].[Lenders_SelectByCreatedBy]
    @CreatedBy = 138,
    @PageIndex = 0,
    @PageSize = 10

*/
BEGIN
  
  DECLARE @Offset int = @PageIndex * @PageSize

    SELECT 
        [L].[Id], 
        [L].[Name],
		[L].[Description],
        
		[LT].[Id] AS [LenderTypeId],
        [LT].[Name] AS [LenderTypeName],
        
		[LoT].[Id] AS [LoanTypeId], 
        [LoT].[Name] AS [LoanTypeName], 
        
		[ST].[Id] AS [StatusId],
        [ST].[Name] AS [StatusName], 
        
		[Loc].[Id] as LocationId, 
        [Loc].[LocationTypeId], 
        [Loc].[LineOne], 
        [Loc].[LineTwo], 
        [Loc].[City], 
        [Loc].[Zip], 
        [States].[Name], 
        [Loc].[Latitude], 
        [Loc].[Longitude], 
        [Loc].[DateCreated], 
        [Loc].[DateModified], 
        [Loc].[CreatedBy], 
        [Loc].[ModifiedBy], 
        [Loc].[IsDeleted],
        
		[L].[Logo], 
        [L].[Website], 
        [L].[DateCreated], 
        [L].[DateModified], 
        
		[U].[Id] as CreatorId,
		[U].[FirstName],
		[U].[LastName],
		[U].[Mi],
		[U].[AvatarUrl],
		
		[MFB].[Id] as ModifierId,
		[MFB].[FirstName],
		[MFB].[LastName],
		[MFB].[Mi],
		[MFB].[AvatarUrl],

        [TotalCount] = COUNT(1) OVER()
    FROM [dbo].[Lenders] AS [L]
    
	INNER JOIN [dbo].[LenderTypes] AS [LT]
    ON [L].[LenderTypeId] = [LT].[Id]
    INNER JOIN [dbo].[LoanTypes] AS [LoT]
    ON [L].[LoanTypeId] = [LoT].[Id]
    INNER JOIN [dbo].[StatusTypes] AS [ST]
    ON [L].[StatusId] = [ST].[Id]
	INNER JOIN [dbo].[Locations] as [Loc]
	ON [L].[LocationId] = [Loc].[Id]
	INNER JOIN States as States
	ON [Loc].[StateId] = [States].[Id]
	INNER JOIN [dbo].[Users] as U
	ON [L].[CreatedBy] = U.[Id]
	INNER JOIN [dbo].[Users] as MFB
	ON [L].[ModifiedBy] = [MFB].[Id]
    
	WHERE [L].[CreatedBy] = @CreatedBy
    ORDER BY [L].[Id]
    OFFSET @Offset Rows
    FETCH NEXT @PageSize ROWS ONLY;
END
