import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Task = ({ text, onRemove, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(editedText);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity onPress={onRemove}>
          <View style={styles.square}></View>
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={(text) => setEditedText(text)}
          />
        ) : (
          <Text style={styles.itemText}>{editedText}</Text>
        )}
      </View>
      {isEditing ? (
        <TouchableOpacity onPress={handleSaveClick} style={styles.edit}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleEditClick} style={styles.edit}>
          <Text>EDIT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  },
  edit: {
    position: 'absolute',
    width: 60,
    height: 30,
    right: '10%',
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  save: {
    width: 60,
    height: 30,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 70,
  },
  editInput: {
    flex: 1,
    padding: 0,
  },
});

export default Task;
