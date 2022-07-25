import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Card, TextInput } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid';


export default function HomeScreen() {
    const user = auth().currentUser;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState();
    const [filter, setFilter] = useState([]);
    const [f,setF] = useState('');
    


    useEffect(() => getCData(), []);

    const getCData = () => {
        setLoading(true)
        fetch("https://api.sampleapis.com/coffee/hot")
            .then((res) => res.json())
            .then((json) => {
                setOffset(offset + 1);
                setData(json.slice((offset - 1) * 3, (offset * 3)));
                setDataSource([...dataSource, ...data])
                setFilteredData([...dataSource, ...data])
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
    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={getCData}
                    style={styles.loadMoreBtn}>
                    <Text style={styles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };
    const searchFilter = (text) => {
        if (text) {
            const newData = dataSource.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(dataSource);
            setSearch(text);
        }
    }
    const selectedFilter = () => {
        const ingredients = dataSource.map((e) => { return e.ingredients })
        const ingredientsFinal = new Set([].concat.apply([], ingredients))
        setFilter([...ingredientsFinal])
        const finaldata = dataSource.filter(e => e.ingredients.includes(f) ? e : null)
        console.log(f)
        setFilteredData([...finaldata])
        console.log(filteredData)
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
                elevation: 10
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
            <ScrollView>

            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#FFF" translucent={true} />
            <Card style={{ padding: 15, marginTop: 70, elevation: 15, borderRadius: 20, width: "96%", marginLeft: 7, backgroundColor: "#b27846", backfaceVisibility: "visible" }}>
                <Text style={styles.title}>Welcome back ! 👋🏻</Text>
                <View style={{ flexDirection: "row", alignItems: "center", left: 150 }}>
                    <Image source={{ uri: user?.photoURL }} style={styles.image} />
                    <Text style={styles.text}>{user?.displayName}</Text>
                </View>
            </Card>
            <View>

                <View style={{ borderWidth: 1, width: "95%", left: 10, padding: 10, marginTop: 20, borderColor: "black", borderRadius: 10, flexDirection: "row" }}>
                    <Text style={{ position: "relative", fontSize: 25, top: -10, fontFamily: "Oswald-Regular" }}>Trendy Searches !</Text>
                    <View style={{ marginTop: 40, left: -160, flexDirection: "column" }}>
                        <TouchableOpacity onPress={() => {setF('Coffee');selectedFilter()}}>
                            <Text style={styles.filterText}>Coffee</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setF('Traditional');selectedFilter()}}>
                            <Text style={styles.filterText}>Traditional</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 40, left: -120, flexDirection: "column" }}>
                        <TouchableOpacity onPress={() => {setF("Espresso");selectedFilter()}}>
                            <Text style={styles.filterText}>Espresso</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setF('Chocolate');selectedFilter()}}>
                            <Text style={styles.filterText}>Chocolate</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 40, left: -80, flexDirection: "column" }}>
                        <TouchableOpacity onPress={() => {setF('Panela');selectedFilter()}}>
                            <Text style={styles.filterText}>Panela</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {setF('Cream');selectedFilter()}}>
                            <Text style={styles.filterText}>Cream</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    scrollEnabled={true}
                /> */}
                <Text style={{ fontSize: 30, marginTop: 10, fontFamily: "Oswald-Regular", padding: 10, color: "black", opacity: 0.8 }}>Available Menu : </Text>
                <TextInput
                    style={{ height: 45, width: "95%", left: 10, borderRadius: 10, elevation: 10 }}
                    placeholder='Type to search ...'
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
                <FlatGrid
                    itemDimension={130}
                    data={filteredData}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={renderItem}
                    ListFooterComponent={renderFooter}
                    scrollEnabled={true}
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
    filterText: {
        fontSize: 15,
        padding: 10,
        color: "#212121",
        fontWeight:"600"
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
