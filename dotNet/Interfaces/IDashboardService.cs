using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.AdminDashboard;
using Sabio.Models.Domain.DashBoards;
using Sabio.Models.Domain.Lenders;
using Sabio.Models.Domain.LoanApplications;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface IDashboardService
    {
        AdminDashboard GetDataForDashboard();
        List<BaseLender> QueryLenders(string query);
        List<Borrower> QueryBorrowers(string query);
        List<LoanApplicationForAdmin> QueryLoanApplications(string query);
        List<LoanApplicationForAdmin> FilterLoanApplicationsByStatus(int statusId);
        List<LoanApplicationForAdmin> FilterLoanApplicationsByLoanType(int loanTypeId);
        BorrowerDashboard GetBorrowerDashUI(int pageIndex, int pageSize, int userId);
        Paged<UserInfo> QueryUsers(int pageIndex, int pageSize, string query);
        Paged<UserInfo> PaginateUsers(int pageIndex, int pageSize);
        Paged<UserInfo> FilterUsersByRole(int pageIndex, int pageSize, int roleId);
        Paged<UserInfo> FilterUsersByStatus(int pageIndex, int pageSize, int statusId);
        void UpdateRole(int userId, string role);
    }
}