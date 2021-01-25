import React, {Component, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import Draggable from 'react-native-draggable';
import Icon from 'react-native-vector-icons/FontAwesome';

console.disableYellowBox = true;

class FetchDataScreen extends Component {
  state = {
    index1: '',
    letCheck: false,
    modalVisible: 'false',
    updatemodalVisible: 'false',
    id: '',
    title: '',
    data: [
      {
        id: 0,
        title: 'First Item',
      },
      {
        id: 1,
        title: 'Second Item',
      },
      {
        id: 2,
        title: 'Third Item',
      },
      {
        id: 3,
        title: 'Fourth Item',
      },
    ],
    updateData: '',
    updatedValue: '',
    updateTitle: '',
    isHidden: false,
  };

  componentDidMount() {}

  handleClick = () => {
    this.state.data.push({title: this.state.title});
    this.setState({modalVisible: !this.state.modalVisible});
  };
  deleteItemById = (index) => {
    setTimeout(() => {
      const data = this.state.data;
      data.splice(index, 1);
      this.setState({data, letCheck: false, index1: ''});
    }, 3000);
  };
  updateHandleClick = () => {
    console.log('index');
  };

  updateItemById = (index) => {
    this.state.data.map((item) => {
      console.log('item', item);
      if (item.id == this.state.updateData) {
        item.title = this.state.updatedValue;
      }
      this.setState({updatemodalVisible: !this.state.updatemodalVisible});
    });
    console.log('this.state.data', this.state.data);
  };

  toggleModal(visible) {
    console.log('testing');
    this.setState({modalVisible: visible});
  }

  updatetoggleModal(visible) {
    this.setState({updatemodalVisible: visible});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={{flexDirection: 'row', marginLeft: 240}}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={async () => {
                    await this.setState({
                      updatemodalVisible: true,
                      updateData: item.id,
                      updateTitle: item.title,
                    });
                    console.log(
                      'updatemodalVisible',
                      this.state.updatemodalVisible,
                    );
                  }}>
                  <Icon name="pencil" size={25} color="green" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => {
                    await this.setState({index1: index, letCheck: true});
                    this.deleteItemById(index);
                  }}>
                  {!this.state.letCheck ? (
                    <Icon name="trash" size={25} color="#900" />
                  ) : (
                    <View>
                      {this.state.index1 == index &&
                      this.state.letCheck == true ? (
                        <ActivityIndicator color="red" size={15} />
                      ) : (
                        <Icon name="trash" size={25} color="#900" />
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        <View>
          <Draggable
            x={300}
            y={-70}
            renderSize={50}
            renderColor="red"
            renderText="+"
            isCircle
            shouldReverse
            onPressOut={() => {
              this.toggleModal(true);
            }}
          />
          <Draggable />

          <View style={styles.centeredView}>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.toggleModal(!this.state.modalVisible);
                      }}>
                      <Icon
                        name="close"
                        style={styles.icon}
                        size={25}
                        color="#900"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{width: 200}}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder="Enter Title"
                      onChangeText={(title) => this.setState({title})}
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => this.handleClick()}>
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        SUBMIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType={'slide'}
              transparent={true}
              visible={this.state.updatemodalVisible}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        this.toggleModal(!this.state.updatemodalVisible);
                      }}>
                      <Icon
                        name="close"
                        style={styles.icon}
                        size={25}
                        color="#900"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{width: 200}}>
                    <TextInput
                      style={styles.textInputStyle}
                      placeholder={this.state.updateTitle}
                      onChangeText={(updatedValue) =>
                        this.setState({updatedValue})
                      }
                    />
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={() => this.updateItemById()}>
                      <Text
                        style={{
                          color: '#fff',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}>
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    marginHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  icon: {
    marginLeft: 150,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 10,
    marginVertical: 5,
  },
  submitButton: {
    backgroundColor: '#1976d2',
    width: 60,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 70,
    marginTop: 5,
  },
});
export default FetchDataScreen;
