import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {app} from './src/config/firebase';
import {getStorage, ref, uploadBytes, uploadString} from 'firebase/storage';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import {async} from '@firebase/util';

const App = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [valBase64, setValBase64] = useState(null);

  useEffect(() => {});

  const selectImage = async () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        const filenya = response.assets[0].base64;
        // console.log(source);
        setImage(source);
        setValBase64(response.assets[0].base64);

        const storage = getStorage(app);
        const storageRef = ref(storage, 'test.jpeg');

        const img = await fetch(response.assets[0].uri);
        const bytes = await img.blob();

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, bytes).then(snapshot => {
          console.log('Uploaded a blob or file!', snapshot);
          console.log('Uploaded a blob or file!', bytes);
        });

        // Base64 formatted string
        // const message2 = response.assets[0].base64;
        // uploadString(storageRef, message2, 'base64').then(snapshot => {
        //   console.log('Uploaded a base64 string!', snapshot);
        // });

        // Data URL string
        // const message4 = `data:image/jpeg;base64,${filenya}`;
        // uploadString(storageRef, message4, 'data_url').then(snapshot => {
        //   console.log('Uploaded a data_url string!', snapshot);
        // });
      }
    });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: 'mixed',
      quality: 1,
    });

    if (!result.didCancel) {
      const storage = getStorage(app);
      const sref = ref(storage, 'image.jpg');

      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();

      await uploadBytes(sref, bytes);
      console.log('test');
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Example Upload Foto to Firebase Storage</Text>
      <Text>Name File : </Text>
      <Text>Size: </Text>
      {valBase64 === null ? (
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/testfirebase-5d3b6.appspot.com/o/example.jpg?alt=media&token=4a18fe2f-d9c0-4b68-89df-dc215e2426f0',
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
            marginTop: 10,
          }}
        />
      ) : (
        <Image
          source={{
            uri: `data:image/png;base64,${valBase64}`,
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
            marginTop: 10,
          }}
        />
      )}

      <TouchableOpacity
        onPress={selectImage}
        style={{
          width: 100,
          backgroundColor: '#e3d4d3',
          marginTop: 10,
          alignItems: 'center',
        }}>
        <Text>Select Pictute</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
