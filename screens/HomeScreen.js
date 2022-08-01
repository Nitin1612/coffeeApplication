import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, VirtualizedList,ActivityIndicator, StatusBar, ScrollView } from 'react-native';
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



    useEffect(() => getBData(), []);

    const getCData = () => {
        setLoading(true)
        fetch("https://api.sampleapis.com/coffee/hot")
            .then((res) => res.json())
            .then((json) => {
                let newData = json.slice((offset - 1) * 20, (offset * 20));
                console.log(newData)
                setDataSource([...data, ...newData])
                setFilteredData([...data, ...newData])
                setData(newData);
                setOffset(offset + 1);
                setLoading(false)
            })

    }

    console.log(loading, "loading")
    const getBData = () => {
        console.log('getBData');
        setLoading(true);
        fetch('https://api.punkapi.com/v2/beers?&page=' + offset)
            .then((response) => response.json())
            .then((responseJson) => {
                setOffset(offset + 1);
                setDataSource([...dataSource,...responseJson]);
                //setFilteredData([...dataSource,...responseJson])
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
        });
    };
    const renderFooter = () => {
        return (
            <View>
                {loading ? (
                    <View style={{ height: 50, width: "100%", justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator style={{ justifyContent: "center" }} color="blue" size={'large'} />
                    </View>
                ) :
            <View style={styles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => (getBData, setLoading(true))}
                    style={styles.loadMoreBtn}>
                </TouchableOpacity>
            </View>}
            </View>
        );
    };
    const searchFilter = (text) => {
        if (text) {
            const newData = dataSource.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
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
    const selectedFilter = (ing) => {
        const ingredients = dataSource.map((e) => { return e.ingredients })
        const ingredientsFinal = new Set([].concat.apply([], ingredients))
        setFilter(ingredientsFinal)
        const finaldata = dataSource.filter(e => e.ingredients.includes(ing) ? e : null)
        setFilteredData(finaldata)
        // console.log(filteredData)
    };

    const headerItem = () => {
           return(
            <View>
                
                    <View>

                        <Card style={{ marginTop: 60, elevation: 15, borderRadius: 20, width: "96%", marginLeft: 7, backgroundColor: "#b27846", backfaceVisibility: "visible", height: 200 }}>
                            <Image
                                style={styles.bImage}
                                source={{ uri: 'https://image.shutterstock.com/image-vector/engraved-coffee-shop-related-objects-260nw-1146698675.jpg' }}
                            />
                            <Text style={styles.title}>Welcome back ! 👋🏻</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", left: 200, marginTop: 50 }}>
                                <Image source={{ uri: user?.photoURL }} style={styles.image} />
                                <Text style={styles.text}>{user?.displayName}</Text>
                            </View>
                        </Card>
                        <View style={{ borderWidth: 1, width: "95%", left: 10, padding: 10, marginTop: 20, borderColor: "black", borderRadius: 10, flexDirection: "row" }}>
                            <Text style={{ position: "relative", fontSize: 25, top: -10, fontFamily: "Oswald-Regular" }}>Trendy Searches !</Text>
                            <View style={{ marginTop: 40, left: -160, flexDirection: "column" }}>
                                <TouchableOpacity onPress={() => (selectedFilter('Coffee'))}>
                                    <Text style={styles.filterText}>Coffee</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => (selectedFilter('Traditional'))}>
                                    <Text style={styles.filterText}>Traditional</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 40, left: -120, flexDirection: "column" }}>
                                <TouchableOpacity onPress={() => (selectedFilter("Espresso"))}>
                                    <Text style={styles.filterText}>Espresso</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => (selectedFilter('Chocolate'))}>
                                    <Text style={styles.filterText}>Chocolate</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 40, left: -80, flexDirection: "column" }}>
                                <TouchableOpacity onPress={() => (selectedFilter('Panela'))}>
                                    <Text style={styles.filterText}>Panela</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => (selectedFilter('Cream'))}>
                                    <Text style={styles.filterText}>Cream</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Text style={{ fontSize: 30, marginTop: 10, fontFamily: "Oswald-Regular", padding: 10, color: "black", opacity: 0.8 }}>Available Menu : </Text>
                        <TextInput
                            style={{ height: 45, width: "95%", left: 10, marginBottom: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 10 }}
                            placeholder='Search By Name ...'
                            value={search}
                            onChangeText={(text) => searchFilter(text)}
                        />
                    </View>
            </View>
        )
    }

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
                        style={{ height: 125, width: 160, elevation: 10, borderRadius: 10 }}
                        source={{ uri: item.image_url }}

                    />
                    <Text style={{ marginTop: 10, fontSize: 12, fontWeight: "600", color: "#212121" }}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: "#ffffff" }}>

            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
            {/* <Image style={styles.BImage}
            source={{uri:'https://media.istockphoto.com/vectors/paper-cup-of-coffee-in-continuous-line-drawing-concept-of-hot-drink-vector-id1322629786?k=20&m=1322629786&s=612x612&w=0&h=EemW7WHKkumT9gj-K2lxyMBivYfNzYDYgUaQ9yKhSiA='}}
            /> */}
            <VirtualizedList
                itemDimension={130}
                data={filteredData}
                style={styles.gridView}
                spacing={10}
                renderItem={renderItem}
                ListHeaderComponent={headerItem}
                ListFooterComponent={renderFooter}
                scrollEnabled={true}
                onEndReached={getBData}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 45,
        top: 10,
        marginBottom: 30,
        left: 20,
        fontFamily: "Oswald-Regular",
        color: "#212121"
    },
    image: {
        height: 30,
        width: 30,
        borderRadius: 150,
        marginBottom: 20,
        flexDirection: "column"
    },
    bImage: {
        ...StyleSheet.absoluteFillObject,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderRadius: 20

    },
    BImage: {
        ...StyleSheet.absoluteFillObject,
        marginTop:200,
        backgroundColor: 'transparent',

    },
    filterText: {
        fontSize: 15,
        padding: 10,
        color: "#212121",
        fontWeight: "600"
    },
    text: {
        color: "#fff",
        left: 10,
        top: -13,
        fontSize: 20,
        fontFamily: "Oswald-Regular",
        letterSpacing: 3,
        flexDirection: "column"
    },
    gridView: {
        marginTop: 10,

    },
    footer: {
        marginBottom: 10
    }
});
