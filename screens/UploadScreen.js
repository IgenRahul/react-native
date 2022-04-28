import { View, Text, Image, TouchableOpacity, PermissionsAndroid } from 'react-native'
import React, { useState } from 'react'
import { launchImageLibrary } from 'react-native-image-picker'
import { getVideoMetaData, Video } from 'react-native-compressor';
import getPath from '@flyerhq/react-native-android-uri-path'
import { useNavigation } from '@react-navigation/native';
import { createThumbnail } from "react-native-create-thumbnail";
import { Image as CImage } from 'react-native-compressor';
// import { Image } from 'react-native-compressor';


const UploadScreen = () => {
    const navigation = useNavigation();
    const [storagePermission, setStoragePermission] = useState(false);

    const [image, setImage] = useState('https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png');

    const checkAndGrantStoragePermission = () => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((isPermitted) => {
            if (isPermitted) {
                setStoragePermission(true);
            }
            else {
                PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                     { message: 'Storage Permission is required for this app', title: 'permission required' })
                     .then((data) => {
                    setStoragePermission(true);
                })
            }
        });
    }

    const thumbnail = async (path, duration) => {
        await createThumbnail({
            url: path,
            timeStamp: duration * 500,
        })
            .then(response => {
                console.log('thumbnail path', response);
                const uri = response.path.replace('file://', "")
                console.log(' thumbnail uri ', uri);
                setImage(response.path);
            })
            .catch(err => console.log({ err }));
    }
    const compress = async (path, type) => {
        try {
            const result = await Video.compress(
                path,
                {
                    compressionMethod: 'auto',
                },
                (progress) => {
                    console.log('Compression Progress: ', progress);
                }
            );
            const compresssedPath = result.replace('file:/', '');
            const metaData = await getVideoMetaData(compresssedPath);

            console.log(metaData);
            console.log(compresssedPath);

            // navigation.navigate('VideoPreview', {
            //     data: compresssedPath
            // })

        } catch (e) {
            console.log('errorrrr', e);
        }
    }




    const upload = async () => {

        checkAndGrantStoragePermission();
        await launchImageLibrary({
            mediaType: 'mixed',
            selectionLimit: 2,
            durationLimit: 10,
            videoQuality: 'low',

        }, async (response) => {
            console.log('Response =', response);
            const path = getPath(response.assets[0].uri);
            console.log(path, response.assets[0].uri);

            // if(response.assets[0].duration > 90) return alertbox with size exceeded warning
            // else 

            if (response.assets[0].type != 'video/mp4') {
                const result = await CImage.compress(path, {
                    compressionMethod: 'auto',
                });
                console.log('image path compresses', result);
                setImage(result);
                // const metaData = await getVideoMetaData(result.replace('file://',""));
                // console.log(metaData);
            }
            else {
                {
                    response.assets.map((asset, index) => {
                        thumbnail(response.assets[index].uri, response.assets[index].duration);
                        compress(path, response.assets[index].type);
                    })
                }

            }
            // response.assets.map((uri)=>{

            // });
        })
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Image
                source={
                    // require(image)
                    {
                        uri: image ? image : 'https://cdn.evilmartians.com/front/posts/optimizing-react-virtual-dom-explained/cover-a1d5b40.png',
                        // uri:,
                    }
                }
                style={{
                    width: 200,
                    height: 200,
                    marginBottom: 50,
                }}
            />
            <TouchableOpacity onPress={upload}>
                <Text>UploadScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UploadScreen