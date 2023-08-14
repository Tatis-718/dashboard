namespace Models.Domain.LoanApplications;

public class LoanApplication
{
    public int Id { get; set; }
    public LookUp3Col LoanType { get; set; }
    public int LoanAmount { get; set; }
    public int LoanTerm { get; set; }
    public decimal PreferredInterestRate { get; set; }
    public int CreditScore { get; set; }
    public LookUp StatusType { get; set; }
    public BaseUser User { get; set; }
    public bool IsBusiness { get; set; }
    public int ProfileData { get; set; }
    public int LoanId { get; set; }
    public LookUp File { get; set; }
    public int BorrowerDebtId { get; set; }
    public Decimal HomeMortgage { get; set; }
    public Decimal CarPayments { get; set; }
    public Decimal CreditCard { get; set; }
    public Decimal OtherLoans { get; set; }
    public int BorrowerId { get; set; }
    public int CollateralTypeId { get; set; }
    public Decimal CollateralAmount { get; set; }
    public int CollateralQuantity { get; set; }
    public DateTime DateCreated { get; set; }
    public DateTime DateModified { get; set; }
    public int CreatedBy { get; set; }
    public int ModifiedBy { get; set; }

}

