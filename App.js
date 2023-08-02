import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
  
const App = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
  
    const addTask = () => {
        if (task) {
            if (editIndex !== -1) {
                const updatedTasks = [...taskList];
                updatedTasks[editIndex] = task;
                setTaskList(updatedTasks);
                setEditIndex(-1);
            } else {
                setTaskList([...taskList, task]);
            }
            setTask("");
        }
    };
  
    const editTask = (index) => {
        const taskToEdit = taskList[index];
        setTask(taskToEdit);
        setEditIndex(index);
    };
  
    const deleteTask = (index) => {
        const updatedTasks = [...taskList];
        updatedTasks.splice(index, 1);
        setTaskList(updatedTasks);
    };
  
    const renderItem = ({ item, index }) => (
        <View style={styles.task}>
            <Text
                style={styles.itemList}>{item}</Text>
            <View
                style={styles.taskButtons}>
                <TouchableOpacity
                    onPress={() => editTask(index)}
                    style={styles.input}>
                    <Text
                        style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deleteTask(index)}
                    style={styles.input}>
                    <Text
                        style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  
    return (
      <View style={{backgroundColor:'white', flex:1}}>
        <View style={styles.container}>
            <Text style={styles.title}>ToDo</Text>
            <View>
              <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                  <View style={{flex: 1.3,justifyContent: 'center',paddingLeft: 5,}}>
                    <TextInput
                      style={styles.input}
                      placeholder="Task"
                      value={task}
                      onChangeText={(text) => setTask(text)}
                    />
                  </View>
                  <View style={{flex: 0.7,justifyContent: 'center',paddingLeft: 5,}}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={addTask}>
                      <Text style={styles.addButtonText}>
                        {editIndex !== -1 ? "Update Task" : "Add Task"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>    
            <View style={{marginTop: 20}}/> 
            <FlatList
                data={taskList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        color:'black'
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18,
    },
    addButton: {
        backgroundColor: "#00A5AB",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
    },
    task: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        fontSize: 18,
    },
    itemList: {
        fontSize: 19,
    },
    taskButtons: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
        color: "green",
        fontWeight: "bold",
        fontSize: 18,
    },
    deleteButton: {
        color: "red",
        fontWeight: "bold",
        fontSize: 18,
    },
});
  
export default App;