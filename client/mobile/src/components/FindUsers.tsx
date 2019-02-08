import React, { Component } from 'react';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { RoundedInput } from '../styled/Input';
import colors from '../styled/colors';
import { nameValidation } from '../utils/validations';
import Loader from './Loader';
import { UserSearch } from '../types/globals';

interface Props {
  placeholder: string;
  setResults(val: UserSearch): void;
}

interface State {
  invalid: boolean;
  loading: boolean;
}

export const SEARCH_FRIENDS_QUERY = gql`
  query SEARCH_FRIENDS_QUERY($searchName: String!) {
    users(where: { name_contains: $searchName }) {
      id
      name
    }
  }
`;

export default class FindUsers extends Component<Props, State> {
  state = {
    invalid: false,
    loading: false
  };
  handleChange = debounce(async (name: string, client: any) => {
    if (nameValidation(name)) {
      this.setState({ invalid: false, loading: true });
      const res = await client.query({
        query: SEARCH_FRIENDS_QUERY,
        variables: {
          searchName: name
        }
      });
      this.setState({
        loading: false
      });
      this.props.setResults({
        name,
        searched: true,
        searchResults: res.data.users
      });
    } else {
      this.setState({ invalid: true, loading: false });
      this.props.setResults({ searched: false, searchResults: [], name: '' });
    }
  }, 350);
  render() {
    const { invalid, loading } = this.state;
    const { placeholder } = this.props;
    return (
      <ApolloConsumer>
        {(client) => (
          <React.Fragment>
            <RoundedInput
              onChangeText={(val: string) => this.handleChange(val, client)}
              placeholder={placeholder}
              borderColor={invalid ? colors.error : colors.color1}
            />
            {loading && <Loader />}
          </React.Fragment>
        )}
      </ApolloConsumer>
    );
  }
}
