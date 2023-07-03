import React from "react";
import PropTypes from "prop-types";
import sabioDebug from "sabio-debug";
import { Card, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const _logger = sabioDebug.extend("BorrowersCurrentLenders");

function BorrowersCurrentLenders(props) {
  const { lender } = props;

  _logger("hello from borrower lenders", lender);

  return (
    <Col className="mx-2">
      <Card className="h-100 d-inline-block">
        <Card.Header>
          <div className="text-center">
            <h3 className="mb-0">{lender.name}</h3>
          </div>
        </Card.Header>
        <div className="text-center">
          <Image className="w-25 rounded" src={lender.logo} alt={lender.name} />
        </div>

        <Card.Body>
          <div>
            <p className="text-center m-2 fw-bold mt-0">
              Type of Lender: {lender.lenderType.name}
            </p>
          </div>

          <div>
            <div className="text-center">
              <h5>Address</h5>
              <p className="m-0">{lender.location.lineOne}</p>
              <p className="m-0">{lender.location.city},</p>
              <p className="m-0">
                {lender.location.state}, {lender.location.zip}
              </p>
              <Link to={lender?.website}>{lender.website}</Link>
            </div>
            <div className="mt-2 text-center">
              <Link
                to={{
                  pathname: `/lender/${lender.id}`,
                }}
                className="btn btn-sm btn-outline-dark"
              >
                View More
              </Link>
            </div>
          </div>
          <div className="text-center m-2 mb-0"></div>
        </Card.Body>
      </Card>
    </Col>
  );
}

BorrowersCurrentLenders.propTypes = {
  lender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
    }),
    lenderType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default BorrowersCurrentLenders;
