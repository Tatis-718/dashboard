import React from "react";
import BorrowersBlogCard from "./BorrowersBlogCard";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function BankingResources(props) {
  const { blog } = props;

  function mapBlogs(blog) {
    return <BorrowersBlogCard key={"Borrower_Blogs" + blog.id} blog={blog} />;
  }

  _logger(props);
  return (
    <Card>
      <Card.Header>
        <div className="mb-3 mb-lg-0">
          <h3 className="mb-0">Banking Resources</h3>
        </div>
      </Card.Header>
      <Row className="d-flex p-2">
        <Col sm={12} md={8} lg={3}>
          <Card className="h-100">
            <Card.Header>
              <div className="justify-content-between align-center d-flex">
                <h4 className="m-2">Getting Started</h4>
                <Link to={"/subscriptions"}>
                  <div className="btn btn-sm btn-outline-white fs-6">
                    View More
                  </div>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="d-lg-flex justify-content-center align-center">
              <Col sm={12}>
                <p className="fs-4">
                  Find a plan that works for you, MoneFi has got you covered.
                  Browse our available subscription plans.
                </p>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={8} lg={3}>
          <Card className="h-100">
            <Card.Header>
              <div className="justify-content-between align-center d-flex">
                <h4 className="m-2">Podcasts</h4>
                <Link>
                  <div className="btn btn-sm btn-outline-white fs-6 ">
                    Go There
                  </div>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="d-lg-flex justify-content-center align-center">
              <Col sm={12}>
                <p className="fs-4">
                  Learn more about investments, trade solutions, and grow your
                  savings with tips from our trusted podcast authors.
                </p>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={8} lg={3}>
          <Card className="h-100">
            <Card.Header>
              <div className="justify-content-between align-center d-flex">
                <h4 className="m-2">Forums</h4>
                <Link to={"/forum"}>
                  <div className="btn btn-sm btn-outline-white fs-6">
                    View More
                  </div>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="d-lg-flex justify-content-center align-center">
              <Col sm={12}>
                <p className="fs-4">
                  Join our financial community and discover new ideas and
                  trending topics on how MoneFi contributed to the
                  accomplishment of clients financial goals.
                </p>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={8} lg={3}>
          <Card className="h-100">
            <Card.Header>
              <div className="justify-content-between align-center d-flex">
                <h4 className="m-2">Activity</h4>
                <Link to={"/blogs"}>
                  <div className="btn btn-sm btn-outline-white fs-6">
                    View More
                  </div>
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="justify-content-between">
              <Col>{blog?.map(mapBlogs)}</Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

BankingResources.propTypes = [
  PropTypes.shape({
    blog: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      blogType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      map: PropTypes.func,
    }),
  }),
];

export default BankingResources;
