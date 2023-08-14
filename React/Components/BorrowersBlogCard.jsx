import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

function BorrowersBlogCard(props) {
  const { blog } = props;
  const navigate = useNavigate();
  function onBlogClicked() {
    navigate(`/blogs/${blog.id}`, { state: props.blog });
  }

  return (
    <Row className="p-0">
      <Col className="align-center d-flex">
        <div className="avatar avatar-md avatar-indicators avatar">
          <Image alt="avatar" src={blog.imageUrl} className="rounded-circle" />
        </div>
        <button onClick={onBlogClicked} className="btn btn-link mb-0 h5">
          {blog.title}
        </button>
      </Col>
      <hr />
    </Row>
  );
}

BorrowersBlogCard.propTypes = {
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
    slice: PropTypes.func,
  }),
};

export default BorrowersBlogCard;
