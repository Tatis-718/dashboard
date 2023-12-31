ALTER PROC [dbo].[LoanApplications_Select_Paged_ByCreatedBy]
    @PageIndex INT,
    @PageSize INT,
	@Id int
AS

/*
	Declare @PageIndex int = 0,
	        @PageSize int = 100,
			@Id int = 1

	Execute [dbo].[LoanApplications_Select_Paged_ByCreatedBy] 
												@PageIndex
												,@PageSize
												,@Id
*/
BEGIN
    DECLARE @Offset INT = @PageIndex * @PageSize;

    SELECT distinct
        la.Id,
        lt.Id as LoanTypeId,
        lt.[Name] as LoanTypeName,
        lt.[Description],
        la.LoanAmount,
        la.LoanTerm,
        la.PreferredInterestRate,
        la.CreditScore,
        st.Id as StatusId,
        st.[Name] as StatusName,
        
		u.Id as UserId,
		u.FirstName,
		u.LastName,
		U.Mi,
		U.AvatarUrl,

        la.IsBusiness,
        
		la.DateCreated,
		la.DateModified,
		la.CreatedBy,
		la.ModifiedBy,

        TotalCount = COUNT(1) OVER ()

    FROM dbo.LoanApplications la

    INNER JOIN dbo.LoanTypes lt ON la.LoanTypeId = lt.Id
    INNER JOIN dbo.StatusTypes st ON la.StatusId = st.Id
    INNER JOIN dbo.Users u ON la.CreatedBy = u.Id
    
	Where la.CreatedBy = @Id

    ORDER BY la.Id DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY
END