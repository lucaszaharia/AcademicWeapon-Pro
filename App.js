import { Text, View, StyleSheet, Image, Button, Modal, TextInput, Animated, Pressable, StatusBar, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Dropdown from 'react-dropdown';
import { SelectCountry } from 'react-native-element-dropdown';
import * as Haptics from 'expo-haptics';
//import 'react-dropdown/style.css';


import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './assets/AssetExample';
//import ImageButton from './components/ImageButton';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  //const [isScreenEmpty, setScreenEmpty] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [colourModalVisible, setColourModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [editWeightModalVisible, setEditWeightModalVisible] = useState(false);
  const [editDateModalVisible, setEditDateModalVisible] = useState(false);
  const [isHorizontalLine2Visible, setHorizontalLine2Visible] = useState(false);
  const [modalHeight, setModalHeight] = useState(175);
  const [course, setCourse] = useState('');
  const [assignmentType, setAssignmentType] = useState('');
  const [assignmentQuantity, setAssignmentQuantity] = useState('');
  const [assignmentWeight, setAssignmentWeight] = useState('');
  const [defaultCourse, setDefault] = useState('');
  const keyArray = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'];
  const [coursesArray, setCoursesArray] = useState([]);
  const [allAssignmentsArray, setAllAssignmentsArray] = useState([]);
  const [tempAssignmentArray, setTempAssignmentArray] = useState([]);
  const [tempAssignmentArray2, setTempAssignmentArray2] = useState([]);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const colourArray1 = ['#48BBC5', '#4D81F0', '#2EA757', '#F9BF31'];
  const colourArray2 = ['#E1D2F7', '#FF8CF3', '#EA4D3D', '#D58F4D'];
  const [colourButtonColour, setColourButtonColour] = useState('#d9d9d9');
  const options = ['one', 'two', 'three'];
  const defaultOption = options[0];
  const dateOptions = { weekday: 'short', month: 'short', day: 'numeric'};
  const [courseIndex, setCourseIndex] = useState(0);
  const [checkboxIndex, setCheckboxIndex] = useState(0);
  const [percentGrade, setPercentGrade] = useState('');
  const [nameChange, setNameChange] = useState('');
  const [weightChange, setWeightChange] = useState('');
  const [dateChange, setDateChange] = useState(new Date());
  //const [dateModalOpen, setDateModalOpen] = useState(false);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);


  const dropdownOptions = [{
    value: '1',
    lable: 'frequency:'
  },
  {
    value: '2',
    lable: 'weekly'
  },
  {
    value: '3',
    lable: 'biweekly'
  },
  {
    value: '4',
    lable: 'once'
  }];
  const [frequency, setFrequency] = useState('1');

  
  const [state, setState] = useState('unchecked'); // Initial state: 'unchecked'
  
  const toggleCheckbox = () => {
    if (state === 'unchecked') {
      setState('checked');
    } else if (state === 'checked') {
      setState('indeterminate');
    } else {
      setState('unchecked');
    }
  };


  const [checkboxModalVisible, setCheckboxModalVisible] = useState(false);
  const toggleCheckboxModal = () => {
    setCheckboxModalVisible(!checkboxModalVisible);
  };

  const [inputGradeModalVisible, setInputGradeModalVisible] = useState(false);
  const toggleInputGradeModal = () => {
    setInputGradeModalVisible(!inputGradeModalVisible);
  }



  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setSelectedDate(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow2(false);
    setDate2(currentDate);
    setSelectedDate2(currentDate);
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  }

  const showDatepicker = () => {
    showMode('date');
  };

  const showDatepicker2 = () => {
    showMode2('date');
  }

  const showTimepicker = () => {
    showMode('time');
  };




  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleColourModal = () => {
    setColourModalVisible(!colourModalVisible);
  };

  const toggleRemoveModal = () => {
    setRemoveModalVisible(!removeModalVisible);
  };

  const toggleEditNameModal = () => {
    setEditNameModalVisible(!editNameModalVisible);
  };

  const toggleEditWeightModal = () => {
    setEditWeightModalVisible(!editWeightModalVisible);
  }

  const toggleEditDateModal = () => {
    setEditDateModalVisible(!editDateModalVisible);
  }

  const removeCourse = (index) => {
    //console.log(coursesArray[index][0]);
    removeFromAllAssignmentsArray(coursesArray[index][0]);
    const newCourseList = [...coursesArray];
    newCourseList.splice(index, 1);
    setCoursesArray(newCourseList);
    storeCoursesArray(newCourseList);
    console.log("course removed from overall course array");
    //updateAssignmentArray();
  };

  const updateAssignmentArray = async () => {
    //if (coursesArray.length)
    //console.log(coursesArray);
    let newAssignmentArray = [...coursesArray];
    newAssignmentArray = newAssignmentArray.flatMap(item => item[2]);
    //newAssignmentArray = newAssignmentArray.flatMap(([, colour, datesAndNames]) => datesAndNames.map(([date, name]) => [date, name, colour]));
    newAssignmentArray = newAssignmentArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    //const map1 = allAssignmentsArray.flatmap((item) => item[2]);
    //const map2 = map1.map((x) => x.push())
    setAllAssignmentsArray(newAssignmentArray);
    //[["Econ", "colour", [[date, name, name2, weight], [date, name, name2, weight]]]]
  };


  const removeAssignment = (index) => {
    //console.log(tempAssignmentArray[index][0]);
    removeAssignmentType(tempAssignmentArray[index][0]);
    const newTempArray = [...tempAssignmentArray];
    newTempArray.splice(index, 1);
    setTempAssignmentArray(newTempArray);
    setModalHeight(modalHeight-42)
    console.log('removed assignment from temp array');
    
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('the-key')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }


  /*const storeCourse1 = async (value) => {
    try {
      await AsyncStorage.setItem('course1', value);
      console.log("stored");
    } catch (e) {
      // saving error
    }
  };*/

  const storeCoursesArray = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('the-key', jsonValue);
    } catch (e) {
      //saving error
    }
    console.log('courses array stored to async storage')
  };

  const storeAssignmentArray = async (value) => {
    try {
      const jsonValue2 = JSON.stringify(value);
      await AsyncStorage.setItem('the-second-key', jsonValue2);
    } catch (e) {
    }
    console.log('assignment array stored to async storage')
  };

  /*const getCoursesArray = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('the-key');
      if (jsonValue == null) {
        return [];
      } else {
        return JSON.parse(jsonValue);
      }
      //return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };*/


  /*const getCourse1Data = async () => {
    try {
      const courseValue = await AsyncStorage.getItem('the-key');
      if (courseValue !== null) {
        console.log(typeof(JSON.parse(courseValue)));
      }
    } catch (e) {
      return [];
      // error reading value
    }
  };*/
  
  /*const removeCourse1 = async () => {
    try {
      await AsyncStorage.removeItem('course1')
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
  }*/

  /*const defaultTextIG = async () => {
    try {
      const forText = await AsyncStorage.getItem('course1');
      if (forText !== null) {
        setDefault(forText);
      }
    } catch (e) {

    }
  };*/

  /*const setInitialCourseArray = async () => {
    try {
      const savedCourseArray = getCoursesArray();
      if (savedCourseArray !== null) {
        setCoursesArray(savedCourseArray);
      }
    } catch (e) {
    }
  }*/

  const setTheCourseArray = async () => {
    try {
      const theArray = await AsyncStorage.getItem('the-key');
      if (theArray !== null) {
        //console.log(typeof(JSON.parse(theArray)));
        setCoursesArray(JSON.parse(theArray));
        //console.log(coursesArray);
        //updateAssignmentArray();
        //isTheScreenEmpty();
      }
      else {
        setCoursesArray([]);
      }
    } catch (e) {
      setCoursesArray([]);      
      // error reading value
    }
    console.log('course array gotten from async storage')
  }

  const setTheAssignmentArray = async () => {
    try {
      const theArray2 = await AsyncStorage.getItem('the-second-key');
      if (theArray2 !== null) {
        setAllAssignmentsArray(JSON.parse(theArray2));
      }
      else {
        setAllAssignmentsArray([]);
      }
    } catch (e) {
      setAllAssignmentsArray([]);
    }
    console.log('assignment array gotten from async storage')
  }

  const doneButton = async () => {
    toggleModal();
    setModalHeight(175);
    setHorizontalLine2Visible(false);
    setTempAssignmentArray([]);
    setTempAssignmentArray2([]);
    setColourButtonColour('#d9d9d9');
    setFrequency('1');
    setSelectedDate(null);
    if (course !== '' && colourButtonColour!=='#d9d9d9' && tempAssignmentArray.length !== 0) {
      coursesArray.push([course, colourButtonColour, tempAssignmentArray2, 0..toFixed(2), 0..toFixed(2)]);
      storeCoursesArray(coursesArray);
      setCourse('');
      concactinateAssignmentArray();
      //setAllAssignmentsArray(allAssignmentsArray.concat(tempAssignmentArray2));
      //setAllAssignmentsArray(allAssignmentsArray.sort((a, b) => new Date(a[0]) - new Date(b[0])));
      //storeAssignmentArray(allAssignmentsArray);
      console.log('course added to overall courses array')


      //updateAssignmentArray();
    } else {
      console.log('course not added because mistakes in parameters')
    }
  }

  const addButton = async () => {
    //console.log(tempAssignmentArray);
    //console.log(tempAssignmentArray2);
    //console.log(selectedDate);
    //console.log(assignmentQuantity);
    //console.log(assignmentType);
    //console.log(assignmentWeight);
    //console.log(frequency);
    if (assignmentType!=='' && assignmentQuantity!=0 && assignmentWeight!=0 && course !== '' && colourButtonColour!=='#d9d9d9') {
      setModalHeight(modalHeight+42)
      setHorizontalLine2Visible(true)
      tempAssignmentArray.push([assignmentType, assignmentQuantity, assignmentWeight])
      pushToAssignmentArray(selectedDate, assignmentQuantity, assignmentType, assignmentWeight, frequency, course, colourButtonColour)
      setAssignmentType('')
      setAssignmentQuantity('')
      setAssignmentWeight('')
      setSelectedDate(null)
      setFrequency('1')
      console.log('assignment added to temp array')
    } else {
      console.log('assignment not added because mistake in parameters')
    }
  }

  const pushToAssignmentArray = async (startingDate, quantity, type, weight, freq, cName, courseColour) => {
    const updatedArray = [...tempAssignmentArray2];
    //const count = 1;
    const curDate = startingDate;
    for (let i = 1; i <= quantity; i++) {
      if (quantity == '1') {
        updatedArray.push([curDate.toDateString(), type, type, parseFloat(weight), cName, courseColour, 0, 0]);        
      } else {
        if (type.length == 1) {
          updatedArray.push([curDate.toDateString(), type, type + '' + i.toString(), parseFloat(weight), cName, courseColour, 0, 0]);
        } else {
          updatedArray.push([curDate.toDateString(), type, type + ' ' + i.toString(), parseFloat(weight), cName, courseColour, 0, 0]);
        }
        if(freq == '2') {
          curDate.setDate(curDate.getDate() + 7);
        } else if (freq == '3') {
          curDate.setDate(curDate.getDate() + 14);
        }
      }
    }
    setTempAssignmentArray2(updatedArray);
    console.log('assignment type added to temp array modal')
  }

  const updateCheckBoxStatus = async (index, newValue) => {
    const updatedArray = [...allAssignmentsArray];
    updatedArray[index][6] = newValue;
    setAllAssignmentsArray(updatedArray);
    storeAssignmentArray(updatedArray);
  }

  const updateGrade = async (index, newValue) => {
    const updatedArray = [...allAssignmentsArray];
    updatedArray[index][7] = newValue;
    setAllAssignmentsArray(updatedArray);
    storeAssignmentArray(updatedArray);
  }

  const updateAssignmentName = async (index, newValue) => {
    const updatedArray = [...allAssignmentsArray];
    updatedArray[index][2] = newValue;
    setAllAssignmentsArray(updatedArray);
    storeAssignmentArray(updatedArray);
  }

  const updateAssignmentWeight = async (index, newValue) => {
    const updatedArray = [...allAssignmentsArray];
    updatedArray[index][3] = newValue;
    setAllAssignmentsArray(updatedArray);
    storeAssignmentArray(updatedArray);
  }

  const updateAssignmentDate = async (index, newValue) => {
    if (newValue !== null) {
      let updatedArray = [...allAssignmentsArray];
      updatedArray[index][0] = newValue.toDateString();
      updatedArray.sort((a, b) => new Date(a[0]) - new Date(b[0]));

      setAllAssignmentsArray(updatedArray);
      storeAssignmentArray(updatedArray);

      //let newArrayy = [...allAssignmentsArray];
      //newArrayy.sort((a, b) => new Date(a[0]) - new Date(b[0]));
      //setAllAssignmentsArray(newArrayy);
      //storeAssignmentArray(newArrayy);
    }
  }

  const removeAssignmentType = async (typeToRemove) => {
    let newArray = [...tempAssignmentArray2];
    newArray = newArray.filter(item => item[1] !== typeToRemove);
    setTempAssignmentArray2(newArray);
    console.log('removed assignment type from temporary modal assignment array')
  }

  const removeFromAllAssignmentsArray = async (typetoRemove) => {
    let newAllArray = [...allAssignmentsArray];
    newAllArray = newAllArray.filter(item => item[4] !== typetoRemove);
    //console.log(newAllArray);
    setAllAssignmentsArray(newAllArray);
    storeAssignmentArray(newAllArray);
    console.log('removed assignment from main/overall assignment array')
  }

  const updateCurrentGradeAndWeightEarned = async (course) => {
    let weight = 0;
    let num2 = 0;
    let weightEarned = 0;
    let theCourseIndex = 0;
    let arrayToPlayWith = [...allAssignmentsArray];
    arrayToPlayWith = arrayToPlayWith.filter(item => item[4] == course);
    arrayToPlayWith = arrayToPlayWith.filter(item => item[6] == 2);
    for (let i = 0; i < arrayToPlayWith.length; i++) {
      weight = weight + arrayToPlayWith[i][3];
      num2 = num2 + (arrayToPlayWith[i][7] * arrayToPlayWith[i][3]);
      weightEarned = weightEarned + (arrayToPlayWith[i][7] * arrayToPlayWith[i][3] / 100)
    }
    //console.log(weight, num2)
    for (let j = 0; j < coursesArray.length; j++) {
      if (coursesArray[j][0] == course) {
        theCourseIndex = j;
      }
    }
    const updatedArray = [...coursesArray];
    if (weight == 0) {
      updatedArray[theCourseIndex][3] = weight.toFixed(2)
      
    } else {
      updatedArray[theCourseIndex][3] = (num2/weight).toFixed(2);
    }
    
    updatedArray[theCourseIndex][4] = weightEarned.toFixed(2);
    setCoursesArray(updatedArray);
    storeCoursesArray(updatedArray);
  };

  const concactinateAssignmentArray = async () => {
    let newArrayy = [...allAssignmentsArray];
    newArrayy = allAssignmentsArray.concat(tempAssignmentArray2);
    newArrayy.sort((a, b) => new Date(a[0]) - new Date(b[0]));
    setAllAssignmentsArray(newArrayy);
    storeAssignmentArray(newArrayy);
    console.log('temp array concactinated to overall array');

  }

  // [[Quiz, 3, 10, [08-02, 08-09, 08-10]], [Final, 1, 50, [05-02]]]
  // [08-02, Quiz, 1, 10], [08-03, Quiz 2, 10], [10-02, Final, 50]

  /*const isTheScreenEmpty = async () => {
    if (coursesArray.length===0) {
      setScreenEmpty(true);
    } else {
      setScreenEmpty(false);
    }
  }*/


  useEffect(() => {
    // Update the document title using the browser API
    //defaultTextIG();
    setTheCourseArray();
    setTheAssignmentArray();
    
    //setInitialCourseArray();
    /*getCoursesArray().then((retrievedArray) => {
      setCoursesArray(retrievedArray);
    });*/
  }, []);
  /*const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('my-key', value);
      console.log("Data Saved");
    } catch (e) {
      // saving error
    }
    <Text>{defaultCourse}</Text>
  };*/

  


  return (   
    <View style={styles.container}>   
        <StatusBar barStyle={'dark-content'}/>   
        {coursesArray.length > 0 && (
          <View style={{ //alignItems: 'center', //alignContent: 'center', //justifyContent: 'center'
          }}>
          <View style={styles.classTextContainer}>
            <Text style={ { fontWeight: 'bold' , marginLeft: 50}}>Class</Text>
            <Text style={ { fontWeight: 'bold', marginLeft: 0}}>Current Grade</Text>
            <Text style={ { fontWeight: 'bold', marginRight: 25}}>Weight Earned</Text>
          </View>
          <View style={styles.courseInfo}>
            {coursesArray.map((item, index) => (
              <View style={styles.courseContainer}>
                <View style={{marginLeft: 12}}>   
                <Button
                    key={index + 0.1}
                    style={styles.removeCourseButton}
                    title="-"
                    color="#000000"
                    onPress={ () => {
                      setCourseIndex(index);
                      toggleRemoveModal()
                      console.log('remove course button pressed')
                      //removeCourse(index)
                    }}>
                </Button>  
                </View>   
                     
                <Text style={{ 
                  flex: 1, 
                  marginLeft: 13}}>{item[0]}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 3}}>
                  <View style={{flex: 1, marginRight: 50}}>
                <Text style={{
                  //flex: 2, 
                  //marginLeft: 45,
                  textAlign: 'right',
                  marginRight: 20
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'>{item[3]}%</Text>
                  </View>
                  <View style={{flex: 1}}>
                <Text style = {{ 
                  marginRight: 50,
                  //flex: 1,
                  //marginLeft: 'auto'
                  textAlign: 'right'
                  }}>{item[4]}%</Text>
                  </View>
                  </View>
                  
                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={removeModalVisible}
                  onRequestClose={toggleRemoveModal}>
                    <View style={styles.removeModalContainer}>
                      <Text style = {{ margin: 10, alignSelf: 'center', fontSize: 16, textAlign: 'center'}}>Are you sure you want to remove this course? This action can't be undone you're gonna have to add everything again</Text>
                      <View style={styles.itemsInARow}>            
                      <Pressable 
                        style={{ padding: 8, backgroundColor: "#898989", borderRadius: 10, height: 32, width: 90, marginTop:15, justifyContent: 'center', marginLeft: 20}}
                        onPress={toggleRemoveModal}>              
                        <Text style={{color: '#FFFFFF', alignSelf:'center'}}>No</Text>
                      </Pressable>
                      
                      <Pressable 
                        style={{ padding: 8, backgroundColor: "#898989", borderRadius: 10, height: 32, width: 90, marginTop:15, justifyContent: 'center', marginRight: 20}}
                        onPress={ () => {
                          toggleRemoveModal();
                          //console.log(courseIndex);
                          removeCourse(courseIndex);
                        }}>              
                        <Text style={{color: '#FFFFFF', alignSelf:'center'}}>Yes</Text>
                      </Pressable>
                      </View>
                    </View>
                </Modal>
              </View>              
            ))}

            <View style={styles.horizontalLine3}/> 
            <ScrollView>


            
            {allAssignmentsArray.map((item, index) => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ backgroundColor: item[5], height: 45, width: 12.5}}/>
                <View style={{flex: 1, marginLeft: 10}}>  
                  <Pressable
                    onPress={ () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      toggleEditNameModal()
                      setCheckboxIndex(index)
                      setNameChange(allAssignmentsArray[index][2])

                    }}>
                    <Text key={index + 0.2}>{item[2]}</Text>
                  </Pressable>     
                  <Modal
                    animationType='fade'
                    transparent={true}
                    visible={editNameModalVisible}
                    onRequestClose={toggleEditNameModal}>
                    <View style={styles.editNameModalContainer}>
                    <TextInput
                      style={{ padding: 8, backgroundColor: '#d9d9d9', height: 30, width: 175, borderRadius: 10, alignSelf: 'center', textAlign: 'center', marginTop: 15}}
                      color='#898989'
                      placeholderTextColor={'#FFFFFF'}
                      //placeholder='%'
                      value={nameChange}
                      onChangeText={setNameChange}  
                      /> 
                    
                    <Pressable
                      style={{width: 50, height: 30, borderRadius: 8, backgroundColor: '#d9d9d9', marginBottom: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 0}}
                      onPress={ () => {
                        toggleEditNameModal()
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        updateAssignmentName(checkboxIndex, nameChange)
                      }}>
                      <Text style={{color: '#FFFFFF'}}>okay</Text>
                    </Pressable>


                    </View>
                  </Modal>         
                  
                </View>  
                <View style={{marginLeft: 40, flex: 1}}>
                  <Pressable
                    onPress={ () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      toggleEditDateModal()
                      setCheckboxIndex(index)
                      
                      setDateChange(new Date(item[0]).toLocaleDateString())
                      //setNameChange(allAssignmentsArray[index][2])

                    }}>
                  <Text style={{ textAlign: 'center'}} key={index + 0.3}>{new Date(item[0]).toLocaleDateString(undefined, dateOptions)}</Text> 
                  </Pressable>
                  <Modal
                    animationType='fade'
                    transparent={true}
                    visible={editDateModalVisible}
                    onRequestClose={toggleEditDateModal}>
                    <View style={styles.editNameModalContainer}>
                    <Pressable
                      style={{ padding: 8, backgroundColor: '#d9d9d9', borderRadius: 10, height: 30, width: 100, marginTop:15, alignSelf: 'center', justifyContent: 'center'}}
                      onPress={showDatepicker2}>
                      <Text style={{color: '#898989', alignSelf:'center'}}>{selectedDate2 ? selectedDate2.toLocaleDateString() : new Date(allAssignmentsArray[checkboxIndex][0]).toLocaleDateString()}</Text>
                    </Pressable>


                    <Pressable
                      style={{width: 50, height: 30, borderRadius: 8, backgroundColor: '#d9d9d9', marginBottom: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 0}}
                      onPress={ () => {
                        toggleEditDateModal()
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        updateAssignmentDate(checkboxIndex, selectedDate2);

                        setSelectedDate2(null)
                        //updateAssignmentWeight(checkboxIndex, parseFloat(weightChange))
                        //updateCurrentGradeAndWeightEarned(allAssignmentsArray[checkboxIndex][4]);
                      }}>
                      <Text style={{color: '#FFFFFF'}}>okay</Text>
                    </Pressable>
                    </View>
                    {show2 && (
            <View style={{ backgroundColor: '#f5f5f5', borderRadius: 8, marginTop: 10, width: 300, alignSelf: 'center'}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date2}
                  mode={mode2}
                  display='inline'
                  is24Hour={true}
                  onChange={onChange2}
                />
              </View>
              )}
                  </Modal>
                </View> 
                <View style={{marginRight: 15, flex: 1}}>  
                  <Pressable
                    onPress={ () => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                      setCheckboxIndex(index)
                      setWeightChange(allAssignmentsArray[index][3].toString())
                      toggleEditWeightModal()
                    }}>
                    <Text 
                      key={index + 0.4}
                      style={{textAlign: 'right'}}>{item[3]}%</Text> 
                  </Pressable>
                  <Modal
                    animationType='fade'
                    transparent={true}
                    visible={editWeightModalVisible}
                    onRequestClose={toggleEditWeightModal}>
                    <View style={styles.editNameModalContainer}>
                    <TextInput
                      style={{ padding: 8, backgroundColor: '#d9d9d9', height: 30, width: 80, borderRadius: 10, alignSelf: 'center', textAlign: 'center', marginTop: 15}}
                      color='#898989'
                      placeholderTextColor={'#FFFFFF'}
                      //placeholder='%'
                      value={weightChange}
                      onChangeText={setWeightChange}  
                      /> 
                    <Pressable
                      style={{width: 50, height: 30, borderRadius: 8, backgroundColor: '#d9d9d9', marginBottom: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 0}}
                      onPress={ () => {
                        toggleEditWeightModal()
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        updateAssignmentWeight(checkboxIndex, parseFloat(weightChange))
                        updateCurrentGradeAndWeightEarned(allAssignmentsArray[checkboxIndex][4]);
                      }}>
                      <Text style={{color: '#FFFFFF'}}>okay</Text>
                    </Pressable>
                    </View>
                  </Modal>
                </View>    
                <Pressable 
                  style={{ marginRight: 15}}
                  onPress={ () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                    toggleCheckboxModal()
                    setCheckboxIndex(index)}}>
                  <View
                    style={{ width: 20, height: 20, borderColor: 'black', borderWidth: 1.5, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: item[6] === 1 ? '#F9BF31' : item[6] === 2 ? '#2EA757' : 'white'}}>
                      {(item[6] === 1 || item[6] === 2) && <Text style={{ alignSelf: 'center'}}>✓</Text>}
                  </View>
                </Pressable>
                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={checkboxModalVisible}
                  onRequestClose={toggleCheckboxModal}>
                  <View style={styles.checkboxModalContainer}>
                    <View style={{marginTop: 20, marginLeft: 20}}>
                      <Pressable 
                        style={{ borderColor: 'black', borderWidth: 2, width: 50, height: 50, borderRadius: 8}}
                        onPress={ () => {
                          toggleCheckboxModal()
                          updateCheckBoxStatus(checkboxIndex, 0)  
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                          updateGrade(checkboxIndex, 0)     
                          updateCurrentGradeAndWeightEarned(allAssignmentsArray[checkboxIndex][4]);                   
                          }}>
                      </Pressable>
                      <Text style={{fontSize: 11, alignSelf: 'center'}}>not done</Text>
                    </View>

                    <View style={{marginTop: 20, marginHorizontal: 20}}>
                      <Pressable 
                        style={{ borderColor: 'black', borderWidth: 2, width: 50, height: 50, borderRadius: 8, backgroundColor: '#F9BF31'}}
                        onPress={ () => {
                          toggleCheckboxModal()
                          updateCheckBoxStatus(checkboxIndex, 1) 
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)  
                          updateGrade(checkboxIndex, 0)      
                          updateCurrentGradeAndWeightEarned(allAssignmentsArray[checkboxIndex][4]);                 
                          }}>
                        <Text style={{fontSize: 40, alignSelf: 'center'}}>✓</Text>
                      </Pressable>
                      <Text style={{ fontSize: 11, alignSelf: 'center'}}>done</Text>
                    </View>

                    <View style={{marginTop: 20, marginRight: 20}}>
                      <Pressable 
                        style={{ borderColor: 'black', borderWidth: 2, width: 50, height: 50, borderRadius: 8, backgroundColor: '#2EA757'}}
                        onPress={ () => {
                          toggleCheckboxModal()
                          updateCheckBoxStatus(checkboxIndex, 2) 
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                          toggleInputGradeModal()                      
                          }}>
                        <Text style={{fontSize: 40, alignSelf: 'center'}}>✓</Text>
                      </Pressable>
                      <Text style={{ fontSize: 11, alignSelf: 'center'}}>graded</Text>
                    </View>
                  </View>
                </Modal>

                <Modal
                  animationType='fade'
                  transparent={true}
                  visible={inputGradeModalVisible}
                  onRequestClose={toggleInputGradeModal}>
                  <View style={styles.inputGradeModalContainer}>
                    <TextInput
                      style={{ padding: 8, backgroundColor: '#d9d9d9', height: 30, width: 80, borderRadius: 10, alignSelf: 'center', textAlign: 'center', marginTop: 15}}
                      color='#898989'
                      placeholderTextColor={'#FFFFFF'}
                      placeholder='%'
                      onChangeText={setPercentGrade}  
                      />    
                    <Pressable
                      style={{width: 50, height: 30, borderRadius: 8, backgroundColor: '#d9d9d9', marginBottom: 15, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 0}}
                      onPress={ () => {
                        toggleInputGradeModal()
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        updateGrade(checkboxIndex, parseFloat(percentGrade))
                        updateCurrentGradeAndWeightEarned(allAssignmentsArray[checkboxIndex][4]);
                      }}>
                      <Text style={{color: '#FFFFFF'}}>okay</Text>
                    </Pressable>
                  </View>
                </Modal>
              </View>  
            ))}   
            </ScrollView>                  
          </View>           
        </View>
        )}

      {coursesArray.length===0 && <Text 
        style={{ 
          alignSelf: 'center', 
          marginTop: 200,
          color: '#898989'
          }}>you don't have anything :(</Text>}

        
             
      <View style={styles.button}>
        <Button
          title="Add"
          color="#f194ff"
          onPress={toggleModal}
        />
      </View>
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={[styles.modalContainer, { height: modalHeight}]}>
          
          <View style={styles.itemsInARow}>
            <TextInput
              style={{ padding: 8, backgroundColor: '#d9d9d9', borderRadius: 10, height: 32, width: 130, padding: 10, marginTop: 15, marginLeft: 25 }}
              autoCapitalize='characters'
              //multiline='true'
              placeholder='course:'
              autoCorrect={false}
              //autoCapitalize='words'
              color='#898989'
              placeholderTextColor={'#FFFFFF'}
              onChangeText={setCourse}
            />
            <Pressable
              style={{ padding: 8, backgroundColor: colourButtonColour, borderRadius: 10, height: 32, width: 70, marginTop:15, justifyContent: 'center'}}
              onPress={toggleColourModal}>
              
              <Text style={{color: '#FFFFFF', alignSelf:'center'}}>colour</Text>
            </Pressable>

            <Pressable 
              onPress={doneButton}
              style={{ padding: 8, backgroundColor: '#d9d9d9', borderRadius: 10, height: 32, width: 60, marginTop:15, marginRight: 25,justifyContent: 'center'}}>
              <Text style={{color: '#FFFFFF', alignSelf:'center'}}>done</Text>
            </Pressable>

            <Modal
              animationType='fade'
              transparent={true}
              visible={colourModalVisible}
              onRequestClose={toggleColourModal}
            >
              <View style={styles.colourModalContainer}>
                <View style={styles.itemsInARow}>
                {colourArray1.map((item, index) => (
                <Pressable
                  style={[styles.colourButton, { backgroundColor: item}]}
                  onPress={ () => {
                    toggleColourModal()
                    setColourButtonColour(item)
                  }}>
                </Pressable>             
              ))}

                </View>
                <View style = {styles.itemsInARow}>
                {colourArray2.map((item, index) => (
                <Pressable
                  style={[styles.colourButton, { backgroundColor: item}]}
                  onPress={ () => {
                    toggleColourModal()
                    setColourButtonColour(item)
                    }}>
                </Pressable>             
              ))}
                </View>
              </View>
            </Modal>
          </View>
          


          <View style={styles.horizontalLine}/>
          <View style={styles.itemsInARow}>
            <TextInput 
              style={{ padding: 8, backgroundColor: '#d9d9d9', height: 32, width: 130, borderRadius: 10, marginTop: 15, marginLeft: 25}}
              placeholder='assessment type:'
              value={assignmentType}
              autoCapitalize='words'
              color='#898989'
              placeholderTextColor={'#FFFFFF'}
              onChangeText={setAssignmentType}
            />

            <TextInput 
              style={{ padding: 8, backgroundColor: '#d9d9d9', height: 32, width: 40, borderRadius: 10, marginTop: 15}}
              placeholder='#:'
              value={assignmentQuantity}
              placeholderTextColor={'#FFFFFF'}
              color='#898989'
              onChangeText={setAssignmentQuantity}
              keyboardType='numbers-and-punctuation'
            />

            <TextInput 
              style={{ padding: 8, backgroundColor: '#d9d9d9', height: 32, width: 90, borderRadius: 10, marginTop: 15, marginRight: 25}}
              placeholder='weight: (%)'
              value={assignmentWeight}
              color='#898989'
              placeholderTextColor={'#FFFFFF'}
              onChangeText={setAssignmentWeight}
              keyboardType='numbers-and-punctuation'
            />
          </View>
          <View style={styles.itemsInARow}>
            <Pressable
              style={{ padding: 8, backgroundColor: '#d9d9d9', borderRadius: 10, height: 32, width: 100, marginTop:15, marginLeft: 25,justifyContent: 'center'}}
              onPress={showDatepicker}
              >
              <Text style={{color: '#FFFFFF', alignSelf:'center'}}>{selectedDate ? selectedDate.toLocaleDateString() : 'starting date:'}</Text>
            </Pressable>
            
              <SelectCountry
              style={styles.dropdown}
              containerStyle={styles.dropdownOptions}
              selectedTextStyle={styles.selectedTextStyle}
              placeholderStyle={styles.placeholderStyle}
              imageStyle={styles.imageStyle}
              iconStyle={styles.iconStyle}
              itemContainerStyle={styles.itemContainerStyle}
              //selectedTextProps={styles.itemContainerStyle}
              iconColor='white'
              maxHeight={200}
              activeColor='#898989'
              value={frequency}
              data={dropdownOptions}
              valueField="value"
              labelField="lable"
              //imageField="image"
              placeholder="Select country"
              searchPlaceholder="Search..."
              onChange={e => {
                setFrequency(e.value);
              }}>

              </SelectCountry>
              <Pressable
                style={{padding: 8, backgroundColor: '#d9d9d9', borderRadius: 10, height: 32, width: 45, marginTop:15, marginRight: 25,justifyContent: 'center'}}
                onPress={addButton}>
              <Text style={{color: '#FFFFFF', alignSelf:'center'}}>add</Text>
              </Pressable>
            
          </View>
          <View style={{ marginTop: 20}}>
          {show && (
            <View style={{ backgroundColor: '#f5f5f5', borderRadius: 8}}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  display='inline'
                  is24Hour={true}
                  onChange={onChange}
                />
              </View>
              )}

            

          </View>
          
          {isHorizontalLine2Visible && <View style={styles.horizontalLine2} />}
          {tempAssignmentArray.map((item, index) => (
              <View style={styles.assignmentsContainer}>    
                <Text 
                  style={{ flex: 1, marginLeft: 30, color: '#898989', marginTop: 0, marginBottom: 0, alignSelf: 'center'}}
                  key={index + 0.5}>{item[0]}</Text>  
                <Text 
                  style={{ marginRight: 20, color: '#898989', marginTop: 0, marginBottom: 0, alignSelf: 'center'}}
                  key={index + 0.6}>{item[2]}%</Text>  
                <View style={{ marginRight: 80, right: 0}}>
                  <Button
                    key={index + 0.7}
                    style={styles.removeAssignmentButton}
                    title="-"
                    color="#898989"
                    onPress={() => removeAssignment(index)}>
                  </Button>
                </View>       
                                
              </View>
            ))}

          
          
        </View>
      </Modal>      
    </View>     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    //padding: 8,
    flexDirection: 'column'
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    //backgroundColor: 'F5F5F5',
    //flex: 1,
    position: 'absolute',
    flex:0.1,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:'#f5f5f5',
    flexDirection:'row',
    height:70,
    alignItems:'center',
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 10,
    bottom: 10,
    //zIndex: 1
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  button2: {
    position: 'absolute',
    bottom: 10,
    left: 10
  },
  modalContainer: {
    width: 325,
    height: 175,
    borderRadius: 35,
    //flex: 1,
    justifyContent: 'flex-start',
    //padding: 20,
    //alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#f5f5f5', // Semi-transparent background color
    marginTop: '25%'
  },
  colourModalContainer: {
    width: 120,
    height: 60,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    marginTop:100

  },
  removeModalContainer: {
    width: 250,
    height: 200,
    borderRadius: 8,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 100,
    borderWidth: 2,
  },

  editNameModalContainer: {
    width: 200,
    height: 100,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 12,
    justifyContent: 'space-between'

  },
  checkboxModalContainer: {
    flexDirection: 'row',
    width: 230,
    height: 100,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    marginTop: 100,
    justifyContent: 'space-between',
    borderRadius: 12

  },
  inputGradeModalContainer: {
    width: 200,
    height: 100,
    backgroundColor: '#f5f5f5',
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 12,
    justifyContent: 'space-between'

  },
  closeButtonContainer: {
    position: 'absolute',
    top: 10, // Adjust this value to control the vertical position
    right: 10, // Adjust this value to control the horizontal position
  },
  classTextContainer: {
    //fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
    //position: 'absolute',
    //top: 10,
    //left: 50
  },
  courseInfo: {
    marginTop: 10,
    height: 560
    //flex: 1
    //position: 'absolute',
    //top:50,
    //left: 18
  },
  minusButton1: {
    position: 'absolute',
    top: 40,
    left: 10
  },
  removeCourseButton: {
    marginLeft: 50
    //marginRight: 20,
    //marginHorizontal: 15
  },
  removeAssignmentButton: {
    marginLeft: 20,
    //justifyContent: ''
  },
  courseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //marginTop: 10,
    marginVertical: -8
  },
  horizontalLine: {
    height: 8,
    backgroundColor: 'white',
    marginTop: 10
  },
  horizontalLine2: {
    height: 4,
    backgroundColor: 'white',
    margineTop: 10
  },
  horizontalLine3: {
    height: 1,
    backgroundColor: '#000000',
    
    alignSelf: 'center',
    //justifyContent: 'center',
    //alignContent: 'center',
    //alignItems: 'center',
    
    width: 315,
    marginTop:15

  },
  inputsContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemsInARow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  assignmentsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  dropdown: {
    //margin: 16,
    marginTop: 15,
    height: 32,
    width: 115,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    padding: 8,
    paddingHorizontal: 8,
  },
  dropdownOptions: {
    backgroundColor: '#d9d9d9',
    borderRadius: 10

  },
  imageStyle: {
    width: 0,
    height: 14,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'white',
    //borderRadius: 10
  },
  itemContainerStyle: {
    borderRadius: 10
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
    color: 'white',
    borderRadius: 10
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  colourButton: {
    height: 20,
    width: 20,
    borderRadius: 4,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4
  },
  colourButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});



/*
<View style={styles.button2}>
        <Button
          title="Checksmth"
          color="#f194ff"
          onPress={ () => {
            //removeFromAllAssignmentsArray("ECON");
            //updateAssignmentArray();
            console.log(allAssignmentsArray);
            //console.log(coursesArray[0])
            //console.log(course)
            console.log(coursesArray)
            //console.log(tempAssignmentArray)
            //console.log(isScreenEmpty)
            //console.log(coursesArray.length)
            //console.log(date)
            //getCourse1Data()
            //removeValue()
            //console.log(getCoursesArray())
          }}
        />
      </View>

*/








/*<View style={styles.closeButtonContainer}>
            <Button title='Done'
              onPress={ () => {
                //console.log(course)
                toggleModal()
                setModalHeight(175)
                setHorizontalLine2Visible(false)
                setTempAssignmentArray([])
                
                //isTheScreenEmpty()
                //storeCourse1(course)
                if (course !== '') {
                  coursesArray.push([course])
                  storeCoursesArray(coursesArray)
                  setCourse('')
                }   
                }}/>
                
          </View>
          
          
          <Button
              title='add'
              style={{marginLeft: 80}}
              onPress={ () => {
                if (assignmentType!=='' && assignmentQuantity!=0 && assignmentWeight!=0) {
                  setModalHeight(modalHeight+30)
                  setHorizontalLine2Visible(true)
                  tempAssignmentArray.push([assignmentType, assignmentQuantity, assignmentWeight])
                  setAssignmentType("")
                  setAssignmentQuantity(0)
                  setAssignmentWeight(0)

                }
                
              }}
            />*/















/*import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import SQLite from 'react-native-sqlite-storage';

import Home from './screens/Home';
import Details from './screens/Details';
import Backend from './screens/Backend';

// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';


//Initializing the SDK. 
Parse.setAsyncStorage(AsyncStorage);
//You need to copy BOTH the the Application ID and the Javascript Key from: Dashboard->App Settings->Security & Keys 
Parse.initialize('j2dfjnxngTdTCxJ34HxBfLypytmuRfRKFpxwref1','UeCcQQWElPjRndtpfW1Q2i6cEJDIFUZojQElFglL');
Parse.serverURL = 'https://parseapi.back4app.com/';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  })

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details}/>
        <Stack.Screen name="Backend" component={Backend}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;*/


/*

Things to add:

1. Info/help page explaining how to use the app would be a good idea
1. Restrict user input to either text or number or whatever is warranted  
2. Include a feature that allows you to select when reading week is and have reccuring assignments skip that week if applicable
2. Haptic feedback to more buttons
3. Increase assignment name text space
4. Try making the list a flatlist to increase speed
5. Have the list auto-start at the first unfinished assignment so you don't have to scroll to wherever you are in the course
6. Add something in the course name section indicating which colour represents which course
7. Maybe shorten fade duration
8. Allow users to edit course details (colour, assignments, whether its a credit/no-credit course)
9. For version 1.1 - include a screen that functions as a grade predictor - based on your current grades and expected grades, what your final grade will be, or what you need to get on a certain exam/assignment to pass the course
10. As part of the above screen, include something allowing you to see all marks received throughout the course
11. Maybe add switch in the main page allowing you to change view from assignemnt weight to assignment mark arned

*/
