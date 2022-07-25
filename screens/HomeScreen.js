import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, FlatList, StatusBar, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Card } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid';

export default function HomeScreen() {
    const user = auth().currentUser;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    // useEffect(() => {
    //     

    //         .then((res) => res.json())
    //         .then((json) => setData(json))

    // }, []);


    useEffect(() => getBData(), []);

    const getCData = () => {
        setLoading(true)
        fetch("https://api.sampleapis.com/coffee/hot")
            .then((res) => res.json())
            .then((json) => {
                setOffset(offset + 1);
                setData(json.slice((offset - 1) * 3, (offset * 3)));
                setDataSource([...dataSource, ...data])
                setLoading(false)
            })

    }


    const getBData = () => {
        console.log('getBData');
        setLoading(true);
        fetch('https://api.punkapi.com/v2/beers?&page=' + offset)
            .then((response) => response.json())
            .then((responseJson) => {
                setOffset(offset + 1);
                setDataSource([...responseJson]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    console.log(dataSource);
    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getBData}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        return (
            <View style={{
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 5,
                padding: 10,
                height: 175,
                backgroundColor: "#FFF8DC",
                borderRadius: 10,
            }}>
                <TouchableOpacity>
                    <Image
                        style={{ height: 120, width: "95%", borderRadius: 10 }}
                        source={{ uri: item.image }}
                    />

                    <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "600", color: "#212121" }}>{item.title}</Text>

                </TouchableOpacity>

            </View>
        );
    }
    return (
        <View style={{ backgroundColor: "#ffffff" }}>

            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FFF" translucent={true} />
            <ScrollView>
                <Card style={{ padding: 15, marginTop: 70, borderRadius: 20, width: "96%", marginLeft: 7, backgroundColor: "#b27846", backfaceVisibility: "visible" }}>
                    <Text style={styles.title}>Welcome back ! 👋🏻</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", left: 150 }}>
                        <Image source={{ uri: user?.photoURL }} style={styles.image} />
                        <Text style={styles.text}>{user?.displayName}</Text>
                    </View>
                </Card>
                <View>
                    <Text style={{ fontSize: 35, marginTop: 10, fontFamily: "Oswald-Regular", padding: 10, color: "black", opacity: 0.8 }}>Available Menu : </Text>
                    {/* <FlatList
                data={dataSource}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
                scrollEnabled={true}
            /> */}
                    <FlatGrid
                        itemDimension={130}
                        data={dataSource}
                        style={styles.gridView}
                        spacing={10}
                        renderItem={renderItem}
                        ListFooterComponent={renderFooter}
                    />

                </View>
                {/* <Text style={styles.text}>{user?.email}</Text> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 45,
        marginBottom: 30,
        fontFamily: "Oswald-Regular",
        color: "#212121"
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 150,
        marginBottom: 20,
        flexDirection: "column"
    },
    text: {
        color: "#fff",
        left: 10,
        top: -13,
        fontSize: 25,
        flexDirection: "column"
    },
    gridView: {
        marginTop: 10,

    }
});
