import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {app} from './src/config/firebase';
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from 'firebase/storage';

import ImagePicker, {launchImageLibrary} from 'react-native-image-picker';
// import * as ImagePicker from 'react-native-image-picker';
import {async} from '@firebase/util';

const App = () => {
  const [urIimage, setUrlImage] = useState(null);
  const [detailImage, setDetailImage] = useState({fileName: '', size: ''});

  useEffect(() => {
    bytesToSize();
  }, [urIimage]);

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
        const filenya = response.assets[0];
        // console.log(source);
        setDetailImage({fileName: filenya.fileName, size: filenya.fileSize});

        const storage = getStorage(app);
        const storageRef = ref(storage, filenya.fileName);

        const img = await fetch(filenya.uri);
        const bytes = await img.blob();

        // 'file' comes from the Blob or File API
        //
        // uploadBytes(storageRef, bytes).then(snapshot => {
        //   console.log('Snapshot : ', snapshot);
        //   console.log('Uploaded a blob or file!', bytes);
        //   // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //   //   console.log('File available at', downloadURL);
        //   // });
        // });

        getDownloadURL((await uploadBytes(storageRef, bytes)).ref).then(
          downloadURL => {
            console.log('File available at', downloadURL);
            setUrlImage(downloadURL);
          },
        );
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

  const bytesToSize = () => {
    var bytes = detailImage.size;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === '') {
      // setDetailImage({...detailImage, size: '0 Byte'});
    } else {
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      var result = Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
      setDetailImage({...detailImage, size: result});
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Example Upload Foto to Firebase Storage</Text>
      <Text>Name File : {detailImage.fileName} </Text>
      <Text>Size: {detailImage.size} </Text>
      {urIimage !== null ? (
        <Image
          source={{
            uri: urIimage,
          }}
          style={{
            width: 200,
            height: 200,
            backgroundColor: 'red',
            marginTop: 10,
          }}
        />
      ) : null}

      <TouchableOpacity
        onPress={selectImage}
        style={{
          width: 120,
          height: 30,
          backgroundColor: '#e3d4d3',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>Select Pictute</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
