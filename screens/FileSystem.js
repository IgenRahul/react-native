import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob'
import { launchImageLibrary } from 'react-native-image-picker';
import getPath from '@flyerhq/react-native-android-uri-path'

// import 
// import { ExternalStorageDirectoryPath ,ExternalCachesDirectoryPath} from 'react-native-fs';
const FileSystem = () => {
    const [image, setImage] = useState('file:///data/user/0/com.d/files/imagern_image_picker_lib_temp_f5f82fa7-77a4-4aae-ab72-a535841bd593.jpg');
    const onpress = async () => {
        console.log('pressed');
        await launchImageLibrary({
            mediaType: 'mixed',
            selectionLimit: 1,
        }, (response) => {
            console.log(response);
            if (response.assets[0].type === "image/jpeg") {

                console.log(RNFS.ExternalStorageDirectoryPath+'/newFolder');
                const destPath =RNFS.ExternalStorageDirectoryPath+'/documents';
                RNFetchBlob.fs.isDir(destPath).then(()=>{
                    RNFS.copyFile(
                        response.assets[0].uri.replace('file://', ""),
                        destPath + '/' + response.assets[0].fileName )
                    .then(()=>{
                        console.log('done');
                    }).catch((e)=>{
                        console.log("rejected",e)
                    });
                    console.log("exist");
                }).catch(()=>{
                    console.log('not exists');
                });
                RNFS.scanFile(destPath + '/' + response.assets[0].fileName);
                // if(RNFetchBlob.fs.isDir(destPath)).{
                //     console.log('already created');
                    
                // }else{
                //     RNFS.mkdir(destPath);
                //     RNFS.copyFile(response.assets[0].uri.replace('file://', ""),RNFS.ExternalStorageDirectoryPath+'/newFolder/' + response.assets[0].fileName)
                //     .then(()=>{
                //         console.log('done');
                //     }).catch(()=>{
                //         console.log("rejected")
                //     })
                // }
            } else {
                // console.log(response);
                const destPath =RNFS.ExternalStorageDirectoryPath+'/documents';
                const realPath = getPath(response.assets[0].uri);
                console.log(realPath);
                RNFetchBlob.fs.isDir(destPath).then(()=>{
                    // console.log("already");
                    RNFS.scanFile(destPath + '/video.mp4');
                    try{
                        RNFS.moveFile(
                            realPath,
                            destPath + '/video.mp4').then(()=>{
                           console.log('done');
                       });
                    }
                    catch(e){
                        console.log('errrroee',e);
                    }   
                }).catch(()=>{
                    console.log('not exists');
                });
                RNFS.scanFile(destPath + '/video.mp4'); 
            }
        });

    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            <Image
                style={{
                    height: 200,
                    width: 200,
                }}
                source={{ uri: image }}
            />
            <TouchableOpacity onPress={onpress}>
                <Text style={{
                    fontSize: 32
                }}>
                    File System
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default FileSystem

// RNFS.copyFile(response.assets[0].uri.replace'('file://', ""), RNFS.DocumentDirectoryPath + '/image' + response.assets[0].fileName).then(() => {
                    
                //     setImage('file://' + RNFS.DocumentDirectoryPath + '/image' + response.assets[0].fileName);
                //     RNFS.scanFile(RNFS.DocumentDirectoryPath + '/image' + response.assets[0].fileName);
                //     RNFS.unlink(RNFS.DocumentDirectoryPath + '/image' + response.assets[0].fileName)
                //         .then(() => {
                //             console.log('FILE DELETED');
                //         })
                //         // `unlink` will throw an error, if the item to unlink does not exist
                //         .catch((err) => {
                //             console.log(err.message);
                //         });
                //         RNFS.unlink(response.assets[0].uri.replace('file://', ""))
                //         .then(() => {
                //             console.log('FILE DELETED');
                //         })
                //         // `unlink` will throw an error, if the item to unlink does not exist
                //         .catch((err) => {
                //             console.log(err.message);
                //         });
                //         console.log("done");
                // }).catch((e) => {
                //     console.log('rejected', e);
                // })