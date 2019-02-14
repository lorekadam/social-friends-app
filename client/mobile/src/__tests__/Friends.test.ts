import { mount } from 'enzyme';
import wait from 'waait';
import toJSON from 'enzyme-to-json';
import Friends, { MY_FRIENDS_QUERY } from '../components/Friends/Friends';
import { MockedProvider } from 'react-apollo/test-utils';

describe('<Friends />', () => {
  it('Renders', () => {
    const wrapper = mount(<Friends />);
    console.log(wrapper.debug());
  });
});
