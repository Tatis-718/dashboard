namespace Services.Interfaces;

public interface ILenderService
{
    int LenderInsert(LenderAddRequest model, int userId);
    void LenderUpdate(LenderUpdateRequest model, int userId);
    void LenderDelete(LenderUpdateRequest model);
    Lender GetById(int id);
    List<Lender> GetAll();
    Paged<Lender> GetAllPaginated(int pageIndex, int pageSize);
    Paged<Lender> LendersGetByCreatedBy(int createdBy, int pageIndex, int pageSize);
    Paged<Lender> LendersGetAllPaginated(int pageIndex, int pageSize, string searchTerm, string filterTerm);


}

