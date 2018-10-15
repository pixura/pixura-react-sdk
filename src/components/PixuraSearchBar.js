
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Alert, Spin } from 'antd';

class PixuraSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
  }

  handleChangeQuery(e) {
    this.setState({ query: e.target.value });
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.query) {
      this.props.onSearch(
        this.state.query,
        this.props.elasticSearchUrl,
        this.props.metadataFields,
        this.props.resultHandler,
      );
    }
  }

  render() {
    return (
      <div>
        <Input
          type="text"
          onChange={this.handleChangeQuery}
        />
        <Button
          type="primary"
          onClick={this.handleSearch}
          disabled={this.props.fetching}
        >
          Search
        </Button>
        {this.props.fetching &&
          <Spin
            spinning
          />}
        {this.props.data &&
          <Alert
            message="Result"
            description={JSON.stringify(this.props.data)}
            type="info"
          />}
        {this.props.error &&
          <Alert
            message="Something went wrong"
            description="Fetching data error"
            type="error"
          />}
      </div>
    );
  }
}

PixuraSearchBar.defaultProps = {
  elasticSearchUrl: 'ropsten-api.pixura.io/elasticsearch',
  metadataFields: ['tags', 'description', 'name']
};

PixuraSearchBar.propTypes = {
  elasticSearchUrl: PropTypes.string,
  metadataFields: PropTypes.arrayOf(PropTypes.string),
  resultHandler: PropTypes.func
};

const mapStateToProps = state => ({
  fetching: state.fetching,
  data: state.data,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  onSearch: (query, url, meta, cb) => dispatch({
    type: 'API_CALL_REQUEST', query, url, meta, cb
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(PixuraSearchBar);
