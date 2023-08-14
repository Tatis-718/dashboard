namespace Services.Interfaces;

public interface ILoanApplicationService
{
    int Insert(LoanApplicationAddRequest model, int UserId);
    void Delete(int id);
    void Update(LoanApplicationUpdateRequest model, int userId);
    Paged<LoanApplicationBorrowerBusiness> GetAllPaginated(int pageIndex, int pageSize);
    Paged<LoanApplicationBorrowerBusiness> GetByTypePaginated(int loanTypeId, int pageIndex, int pageSize);
    List<LoanApplication> GetCurrentPage(int pageIndex, int pageSize, int userId);

}

