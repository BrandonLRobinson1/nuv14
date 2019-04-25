import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

const reactotron = Reactotron
  .configure({
    name: 'NUV14'
  })
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux({
    isActionImportant: action => action.type === 'some action type'
  }))
  .connect();

export default reactotron;
