import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import dashBoardsService from "../../../services/dashboardService";
import BorrowerLoanCard from "./BorrowerLoanCard";
import Score from "react-score-indicator";
import LoanCalculator from "components/loan/loanscalculator/LoanCalculator";
import toastr from "toastr";
import BankingResources from "components/dashboard/borrowers/BankingResources";
import PropTypes from "prop-types";
import BorrowersCurrentLenders from "./BorrowersCurrentLenders";
import creditIndicatorColors from "./creditIndicatorColors";

function BorrowersDashboard(props) {
  const [bData, setBData] = useState({
    blogsData: [],
    loansData: [],
    lenders: [],
    files: [],
    creditScore: 0,
  });

  const [currentUser] = useState(props?.currentUser);

  useEffect(() => {
    dashBoardsService
      .getBorrowersUI(0, 3)
      .then(onGetUISuccess)
      .catch(onGetUIError);
  }, []);

  const onGetUISuccess = (response) => {
    setBData((prevState) => {
      let uiData = { ...prevState };
      if (response.item.blogs !== null) {
        uiData.blogsData = response.item.blogs.pagedItems;
      }

      if (response.item.loanApplications !== null) {
        uiData.loansData = response.item.loanApplications.map(mapLoans);
        uiData.creditScore = response.item.loanApplications[0]?.creditScore;
      } else {
        toastr.info("You have no active loan application");
      }

      if (response.item.lenders !== null) {
        uiData.lenders = response.item.lenders.pagedItems.map(mapLenders);
      } else {
        toastr.warning(
          "You have no active Lenders, Consider opening a line of credit"
        );
      }

      if (response.item.files !== null) {
        uiData.files = response.item.files.pagedItems;
      }

      return uiData;
    });
  };

  function mapLoans(loan) {
    return (
      <BorrowerLoanCard key={"Borrower_Loan_Details" + loan.id} loan={loan} />
    );
  }

  function mapLenders(lender) {
    return (
      <BorrowersCurrentLenders
        key={"Borrower_Lender_List" + lender.id}
        lender={lender}
      />
    );
  }

  const onGetUIError = () => {};

  _BorrowersDash(currentUser, bData);
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
              <div className="mb-3 mb-lg-0">
                <h1 className="mx-3 mb-0 h2 fw-bold">
                  {`Borrower's Dashboard`}
                </h1>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className=" m-0">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/appointments/client" className="m-1">
                    Schedules
                  </Link>
                  <Link to="/appointments" className="m-1">
                    Create Appointments
                  </Link>
                  <Link to="/courses" className="m-1">
                    Courses
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>
          <Row className="mb-2 mt-2">
            <Col xl={12} lg={12} md={12} className="mb-2">
              <Card className="">
                <Card.Body className="d-flex mt-2 p-0">
                  <Col className="mx-1">
                    <Card className="h-100">
                      <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="mb-0">Credit Score</h4>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <div id="chart" className="text-center">
                          <Score
                            value={bData?.creditScore}
                            // value={400}
                            fadedOpacity={120}
                            maxValue={850}
                            borderWith={100}
                            gap={0}
                            maxAngle={300}
                            rotation={90}
                            lineGap={2}
                            stepsColors={creditIndicatorColors}
                          />
                        </div>

                        <div className="mt-2">
                          <h4 className="text-center">Recommendations</h4>
                          {bData?.creditScore > 0 ? (
                            <div className="text-center">
                              <p className="m-0">
                                Continue to make on time payments
                              </p>
                              <p className="m-0">
                                Using 30% or less of your credit line could
                                improve your credit
                              </p>
                              <p className="m-0">
                                You have a strong credit history
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col className="mx-1">
                    <Card className="h-100">
                      <Card.Header>
                        <div className="mb-0">
                          <h4>Current Applications</h4>
                        </div>
                      </Card.Header>
                      <Card.Body className="m-0 p-1 d-flex justify-content-center">
                        {bData?.loansData.length > 0 ? (
                          bData?.loansData
                        ) : (
                          <strong>No loan applications available</strong>
                        )}{" "}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col className="mx-1">
                    <LoanCalculator />
                  </Col>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <Row className="mb-2">
          <Col xl={12} lg={12} md={12} className="mb-2">
            <Card>
              <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">Preferred Lenders</h4>
                </div>
              </Card.Header>
              {bData?.lenders.length > 0 ? (
                <Card.Body className="d-flex">{bData?.lenders}</Card.Body>
              ) : (
                <strong className="justify-content-center">
                  There are no lenders available yet, consider opening a new
                  account
                </strong>
              )}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <BankingResources blog={bData?.blogsData} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

BorrowersDashboard.propTypes = {
  currentUser: PropTypes.shape(
    PropTypes.shape({
      isLoggedIn: PropTypes.bool,
      roles: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
    })
  ),
};

export default BorrowersDashboard;
