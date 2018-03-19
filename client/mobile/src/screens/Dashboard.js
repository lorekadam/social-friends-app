import React from 'react';
import { connect } from 'react-redux';

import { Container, Button, Content, Text } from 'native-base';
import { navChange } from '../actions/navigationActions';
import Auth from '../components/require_auth';

const styles = {
  flex: 1,
  backgroundColor: 'red'
};

// @Auth
@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <Container style={styles}>
        <Content>
          <Button
            onPress={() => this.props.dispatch(navChange('LOGIN_SCREEN'))}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>DASHBOARD Go to login screen</Text>
          </Button>
          <Text>
            kadjfbkdfjasbfdksajbd bfdksajbd bfdksajbdbfdksajbdbfdksajbdbfdksajbdvbfdksajbdv
            vvbfdksajbdbfdksajbd fdfdsf sdkjf skfdjs kdj sfkjd skjs kjs dkjf sdkjf skj dfksjd fkjs
            dlfh sdfjgldh flgsh dlfgksdj fgskdfj glsdf sdlkhf ;sdjflksjdflgkjsdf;kjsdflgkjsdgldskfgk
          </Text>
        </Content>
      </Container>
    );
  }
}
