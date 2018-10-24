import React from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { Button, Text, Row, Col, Body, Spinner, List, ListItem } from 'native-base';
import { Query } from 'react-apollo';

import * as types from '../actions/types';

import { back, navChange } from '../actions/navigationActions';
import { getDuels } from '../ql/queries';

@connect()
export default class DuelsScreen extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <ScrollView>
        <Row>
          <Col>
            <Button onPress={() => dispatch(back())}>
              <Text>Back</Text>
            </Button>
          </Col>
        </Row>
        <Query query={getDuels()} pollInterval={500}>
          {({ loading, data }) => (
            <React.Fragment>
              {loading ? (
                <Spinner />
              ) : (
                <List>
                  {data.user.duels.map((duel, i) => (
                    <ListItem
                      key={i}
                      onPress={() =>
                        dispatch(navChange(types.DUEL_DETAILS_SCREEN, { _id: duel._id }))
                      }
                    >
                      <Body>
                        <Text>{duel.name}</Text>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              )}
            </React.Fragment>
          )}
        </Query>
      </ScrollView>
    );
  }
}
