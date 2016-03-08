import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


const PageBehindModals = () => {
  const text = Array(500).fill().map(() => 'Background text here.').join(' ');

  return (
    <Grid>
      <Row>
        <Col md={ 12 }>
          <p>{ text }</p>
        </Col>
      </Row>
    </Grid>
  );
};

export default PageBehindModals;
