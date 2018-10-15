import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card, Layout } from 'antd';

import PixuraSearchBar from './components/PixuraSearchBar';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchResult = this.handleSearchResult.bind(this);
  }

  handleSearchResult(value) {
    console.log(value);
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <Row>
            <Col span={24}>
              <Card>
                <PixuraSearchBar
                  elasticSearchUrl="https://ropsten-api.pixura.io/elasticsearch"
                  metadataFields={['tags', 'description', 'name']}
                  resultHandler={this.handleSearchResult}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
