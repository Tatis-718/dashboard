import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function BorrowerLoanCard(props) {
  const { loan } = props;

  return (
    <Card className="mt-2 h-50 w-50 align-center justify-content-center">
      <div className="m-0 p-0">
        <Card.Header className="m-0 p-1 text-center bg-info">
          <h5 className="m-0 p-0 text-white">
            {loan.loanType.name} #{loan.id}
          </h5>
        </Card.Header>
        <Card.Body className="align-center justify-content-center">
          <p className="m-0 fs-5">
            Status: <span className="m-0">{loan.statusType.name}</span>
          </p>
          <p className="m-0 fs-5">
            Term: <span>{loan.loanTerm}</span> Months
          </p>
          <p className="m-0 fs-5">
            Amount: $<span>{loan.loanAmount}</span>
          </p>
        </Card.Body>
      </div>
    </Card>
  );
}

BorrowerLoanCard.propTypes = {
  loan: PropTypes.shape({
    id: PropTypes.number.isRequired,
    loanAmount: PropTypes.number.isRequired,
    loanTerm: PropTypes.number.isRequired,
    loanType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default BorrowerLoanCard;
