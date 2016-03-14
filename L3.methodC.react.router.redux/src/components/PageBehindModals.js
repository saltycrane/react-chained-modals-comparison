import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';


export default class PageBehindModals extends Component {
  render() {
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
  }
}
