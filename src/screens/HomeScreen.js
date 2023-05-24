import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";
import {
  MagnifyingGlassIcon,
  SunIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [search, setSearch] = useState(false);
  const [location, setLocation] = useState([1, 2, 3]);

  const data = [
    {
      id: 1,
      image: require("../assets/images/heavyrain.png"),
      day: "Sunday",
      temperature: "12.6",
    },
    {
      id: 2,
      image: require("../assets/images/emptyStar.png"),
      day: "Monday",
      temperature: "17.2",
    },
    {
      id: 3,
      image: require("../assets/images/cloud.png"),
      day: "Tuesday",
      temperature: "15.5",
    },
    {
      id: 4,
      image: require("../assets/images/moderaterain.png"),
      day: "Wednesday",
      temperature: "1.2",
    },
    {
      id: 5,
      image: require("../assets/images/mist.png"),
      day: "Thursday",
      temperature: "19.6",
    },
    {
      id: 6,
      image: require("../assets/images/partlycloudy.png"),
      day: "Friday",
      temperature: "23.2",
    },
    {
      id: 7,
      image: require("../assets/images/line.png"),
      day: "Saturday",
      temperature: "32.6",
    },
  ];

  const handleLocation = (loc) => {
    console.log("location", loc);
  };
  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={100}
        source={require("../assets/images/blue.webp")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        {/* search */}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full mt-6"
            style={{
              backgroundColor: search ? theme.bgWhite(0.2) : "transparent",
            }}
          >
            {search ? (
              <TextInput
                placeholder="Search city"
                placeholderTextColor={"lightgray"}
                className="pl-6  h-10 pb-1 flex-1 text-base text-white"
              />
            ) : null}

            <TouchableOpacity
              onPress={() => setSearch(!search)}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
          {location.length > 0 && search ? (
            <View className="absolute w-full bg-gray-300 top-16 mt-10 rounded-3xl">
              {location.map((loc, index) => {
                let showBorder = index + 1 != location.length;
                let borderClass = showBorder
                  ? "border-b-2 border-b-gray-500"
                  : "";
                return (
                  <TouchableOpacity
                    onPress={() => handleLocation(loc)}
                    key={index}
                    className={
                      "flex-row items-center border-0 p-3 px-4 mb-1 " +
                      borderClass
                    }
                  >
                    <MapPinIcon size={20} color="grey" />
                    <Text className="text-black text-lg ml-2">
                      Gwarko, Lalitpur
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
        {/* forecast section */}
        <View style={styles.forecastContainer}>
          {/* location */}
          <Text className="text-white text-center text-2xl font-bold">
            Gwarko,
          </Text>
          <Text className="font-semibold text-center text-lg text-gray-300">
            Lalitpur
          </Text>
        </View>
        {/* weather Image */}
        <View className="flex-col ">
          <Image
            source={require("../assets/images/partlycloudy.png")}
            style={styles.img}
          />
          <View className="flex-col justify-center">
            <Text className="text-white text-center font-bold text-7xl mt-4">
              0.8°
            </Text>
            <Text className="text-white text-center font-semibold text-1xl">
              Partly Cloudy
            </Text>
          </View>
        </View>

        {/* Stats */}

        <View className="flex-row justify-between mx-4 mt-5">
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icons/wind.png")}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">6.1km</Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icons/drop.png")}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">94%</Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icons/sun.png")}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">05:15 AM</Text>
          </View>
        </View>

        <View className="flex-row justify-between mx-3 mt-5">
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.cardImg} />
                <Text className="text-center font-semibold m-1 mb-2">
                  {item.day}
                </Text>
                <Text className="text-center font-medium m-1 mb-2">
                  {item.temperature}
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  forecastContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  img: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignSelf: "center",
  },
  card: {
    backgroundColor: "#6d8c90",
    borderRadius: 8,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    height: 130,
    width: 125,
    marginRight: 10,
  },
  cardImg: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 5,
  },
});
