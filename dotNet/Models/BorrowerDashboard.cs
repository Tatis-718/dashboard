namespace Models.Domain.DashBoards;

public class BorrowerDashboard
{
    public Paged<Blog> Blogs { get; set; }
    public List<LoanApplication> LoanApplications { get; set; }
    public Paged<Lender> Lenders { get; set; }
    public Paged<File> Files { get; set; }
}

