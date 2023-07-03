using Sabio.Models.Domain.Blogs;
using Sabio.Models.Domain.Lenders;
using Sabio.Models.Domain.LoanApplications;
using Sabio.Models.Files;
using System.Collections.Generic;

namespace Sabio.Models.Domain.DashBoards
{
    public class BorrowerDashboard
    {
        public Paged<Blog> Blogs { get; set; }
        public List<LoanApplication> LoanApplications { get; set; }
        public Paged<Lender> Lenders { get; set; }
        public Paged<File> Files { get; set; }
    }
}
