import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Navbar from './Navbar';
import CameraView from '../containers/Camera';
var YouTube = require('react-native-youtube');

class ViewMyWormhole extends Component {
  back() {
    this.props.navigator.pop();
  }
  startSubmission() {
    let { myCurrentWormhole, initPendingSubmission } = this.props;
    initPendingSubmission(myCurrentWormhole);
    this.props.navigator.push({
      component: CameraView
    });
  }
  componentWillMount() {
    console.log(this.props.myCurrentWormhole);
  }

  video() {
    debugger;
    var { myCurrentWormhole } = this.props;
    if (myCurrentWormhole.submitter['video_url']) {
      return (
        <YouTube 
          videoId={myCurrentWormhole.submitter['video_url']}
          play={false}
          hidden={false}
          playsInline={true}
          showinfo={false}
          modestbranding={true}
          onError={(e)=>{console.log('youtube error: ', e.error)}}
          style={{alignSelf: 'stretch', height: 220, backgroundColor: 'transparent', marginBottom: 0}}
        />
      );    
    } else {
      return <View />
    }
  }

  render() {

    let { myCurrentWormhole } = this.props;
    console.log('myCurrentWormhole: ', myCurrentWormhole);
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.back.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Back </Text>
        </TouchableHighlight>
        { this.video() }
        <Text style={styles.title}>
          Title: {myCurrentWormhole.wormhole.title}
        </Text>

        <Text style={styles.title}>
          Requestor: {myCurrentWormhole.submitter.username}
        </Text>

        <Text style={styles.title}>
          Deadline
        </Text>
        <Text style={styles.text}>
          {myCurrentWormhole.wormhole.deadline}
        </Text>

        <Text style={styles.title}>
          Notes
        </Text>
        <Text style={styles.text}>
          {myCurrentWormhole.notes}
        </Text>
        
        <TouchableHighlight
          style = {styles.loginButton}
          onPress = {this.startSubmission.bind(this)}
          underlayColor = '#88D4f5'
        >
          <Text style = {styles.buttonText}> Request! </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white',
  },
  splashImage: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: 'black'
  },
  loginButton: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
});

export default ViewMyWormhole;
