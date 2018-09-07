import React from 'react';
import { Mutation } from 'react-apollo';
import { Form, Row, Col, Item, Input, Button, Text } from 'native-base';
import { friendInvite } from '../ql/mutations';
import { InfoPill } from '../styled/InfoPill';

export default class SendFriendInvitation extends React.Component {
  constructor() {
    super();
    this.state = {
      friendName: ''
    };
  }
  setFriend = (val) => {
    this.setState({
      friendName: val
    });
  };
  handleMutation = (action) => {
    const { friendName } = this.state;
    action({ variables: { friendName } });
  };
  render() {
    const { friendName } = this.state;
    return (
      <Mutation mutation={friendInvite()}>
        {(addFriend, { data, loading, error }) => {
          const res = data ? data.addFriend : {};
          return (
            <Form>
              <Row>
                <Col size={3}>
                  <Item rounded error={res.error === true} success={res.error === false}>
                    <Input
                      value={friendName}
                      onChangeText={val => this.setFriend(val)}
                      placeholder="Friend username..."
                    />
                  </Item>
                </Col>
                <Col size={1}>
                  <Button rounded onPress={() => this.handleMutation(addFriend)}>
                    <Text>Send</Text>
                  </Button>
                </Col>
              </Row>
              {Object.keys(res).length > 0 &&
                (res.error ? (
                  <InfoPill type="error" message={res.message} />
                ) : (
                  <InfoPill type="success" message={res.message} />
                ))}
              {loading && <Text>Loading...</Text>}
              {error && <Text>Error :( Please try again</Text>}
            </Form>
          );
        }}
      </Mutation>
    );
  }
}
