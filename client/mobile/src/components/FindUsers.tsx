import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import debounce from 'lodash.debounce';
import { RoundedInput } from '../styled/Input';
import colors from '../styled/colors';
import { nameValidation } from '../utils/validations';
import Loader from './Loader';
import { Query } from '../QL/types';
import { UserSearch } from '../QL/globals';

interface Props {
  placeholder: string;
  setResults(val: UserSearch): void;
  query: Query;
}

interface State {
  invalid: boolean;
  loading: boolean;
}

export default class FindUsers extends Component<Props, State> {
  state = {
    invalid: false,
    loading: false
  };
  handleChange = debounce(async (name: string, client: any) => {
    const { query, setResults } = this.props;
    if (nameValidation(name)) {
      this.setState({ invalid: false, loading: true });
      const res = await client.query({
        query,
        variables: {
          searchName: name
        }
      });
      this.setState({
        loading: false
      });
      setResults({ data: res.data, searched: true, name });
    } else {
      this.setState({
        invalid: true
      });
      setResults({ data: {} });
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
