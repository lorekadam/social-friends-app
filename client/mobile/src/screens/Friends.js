import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import { ApolloConsumer } from 'react-apollo';

import Screen from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';

@connect()
export default class FriendsScreen extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div>
            {this.state.dog && <img src={this.state.dog.displayImage} />}
            <button
              onClick={async () => {
                const { data } = await client.query({
                  query: GET_DOG_PHOTO,
                  variables: { breed: 'bulldog' }
                });
                this.onDogFetched(data.dog);
              }}
            >
              Click me!
            </button>
          </div>
        )}
      </ApolloConsumer>
      // <Query
      //   query={gql`
      //     {
      //       user(_id: "5b5771877542c88aaaf0f219") {
      //         email
      //       }
      //     }
      //   `}
      // >
      //   <Screen column>
      //     <StyledText>Friends</StyledText>
      //     <Button onPress={() => this.props.dispatch(back())}>
      //       <StyledText>Back</StyledText>
      //     </Button>
      //     {({ loading, error, data }) => {
      //       console.log(loading, error, data);
      //     }}
      //   </Screen>
      // </Query>
    );
  }
}
