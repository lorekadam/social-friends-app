import React from 'react';
import { Button, Text } from 'native-base';
import { Mutation } from 'react-apollo';
import { addDuel } from '../ql/mutations';
import { InfoPill } from '../styled/InfoPill';

export default class AddDuel extends React.Component {
  handleMutation = (action) => {
    const { friendId, duelName } = this.props;
    action({ variables: { friendId, duelName } });
  };
  render() {
    return (
      <Mutation mutation={addDuel()}>
        {(accept, { data, loading, error }) => {
          const res = data ? data.addDuel : {};
          return (
            <React.Fragment>
              {loading ? (
                <Text>Loading...</Text>
              ) : (
                <Button onPress={() => this.handleMutation(accept)}>
                  <Text>DUEL!</Text>
                </Button>
              )}
              {Object.keys(res).length > 0 &&
                (res.error ? (
                  <InfoPill type="error" message={res.message} />
                ) : (
                  <InfoPill type="success" message={res.message} />
                ))}
              {error && <Text>Error :( Please try again</Text>}
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}
