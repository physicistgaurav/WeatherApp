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
import axios from "axios";
import moment from "moment";

import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";

const HomeScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchForecastData = async () => {
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/forecast.json",
        {
          params: {
            key: "0b57a6a393784f5bbd2114742232405",
            q: searchQuery,
            days: 7,
          },
        }
      );
      const forecastDays = response.data?.forecast?.forecastday || [];
      const updatedForecastData = forecastDays.map((day) => {
        const date = new Date(day.date);
        const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
        return {
          ...day,
          day: {
            ...day.day,
            weekday,
          },
        };
      });
      setForecastData(updatedForecastData);
    } catch (error) {
      console.log("Error fetching forecast data:", error);
    }
  };

  const fetchWeatherStat = async () => {
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: "0b57a6a393784f5bbd2114742232405",
            q: searchQuery,
          },
        }
      );
      const currentData = response.data?.current || {};
      setWind(currentData.wind_kph);
      setHumidity(currentData.humidity);
      setCurrentTime(moment().format("hh:mm A"));
      setWeatherData(response.data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };
  const handleSearch = () => {
    fetchForecastData();
    fetchWeatherStat();
  };

  if (searchQuery === "") {
    return (
      <View className="flex-1 relative">
        <StatusBar style="light" />
        <Image
          blurRadius={100}
          source={require("../assets/images/blue.webp")}
          className="absolute h-full w-full"
        />
        <SafeAreaView className="flex flex-1">
          <View style={{ height: "7%" }} className="mx-4 relative z-50 mb-6">
            <View
              className="flex-row justify-end items-center rounded-full mt-6"
              style={{
                backgroundColor: theme.bgWhite(0.2),
              }}
            >
              <TextInput
                placeholder="Search city"
                placeholderTextColor="lightgray"
                className="pl-6 h-10 pb-1 flex-1 text-base text-white"
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />

              <TouchableOpacity
                onPress={handleSearch}
                style={{ backgroundColor: theme.bgWhite(0.3) }}
                className="rounded-full p-3 m-1"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.forecastContainer}>
            <Text className="text-white text-center text-1xl font-bold">
              Please Search For Location Too See Weather
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={100}
        source={require("../assets/images/blue.webp")}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View style={{ height: "7%" }} className="mx-4 relative z-50 mb-6">
          <View
            className="flex-row justify-end items-center rounded-full mt-6"
            style={{
              backgroundColor: theme.bgWhite(0.2),
            }}
          >
            <TextInput
              placeholder="Search city"
              placeholderTextColor="lightgray"
              className="pl-6 h-10 pb-1 flex-1 text-base text-white"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />

            <TouchableOpacity
              onPress={handleSearch}
              style={{ backgroundColor: theme.bgWhite(0.3) }}
              className="rounded-full p-3 m-1"
            >
              <MagnifyingGlassIcon size="25" color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {/* forecast section */}
        <View style={styles.forecastContainer}>
          {/* location */}
          <MapPinIcon size={25} color="white" style={{ marginRight: 3 }} />
          <Text className="text-white text-center text-2xl font-bold">
            {weatherData.location?.name}
          </Text>
          <Text className="font-semibold text-center text-lg text-gray-300">
            {weatherData.location?.region}
          </Text>
        </View>
        {/* weather Image */}
        <View className="flex-col">
          {weatherData.current && (
            <Image
              source={{ uri: `https:${weatherData.current.condition.icon}` }}
              style={styles.cardImgMain}
            />
          )}
          <View className="flex-col justify-center">
            <Text className="text-white text-center font-bold text-7xl mt-4">
              {weatherData.current?.temp_c}°
            </Text>
            <Text className="text-white text-center font-semibold text-1xl">
              {weatherData.current?.condition.text}
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
            <Text className="text-white font-semibold text-base">{wind}km</Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icons/drop.png")}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">
              {humidity}%
            </Text>
          </View>
          <View className="flex-row space-x-2 items-center">
            <Image
              source={require("../assets/icons/sun.png")}
              className="w-6 h-6"
            />
            <Text className="text-white font-semibold text-base">
              {currentTime}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between mx-3 mt-5">
          <FlatList
            data={forecastData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image
                  source={{ uri: `https:${item.day.condition.icon}` }}
                  style={styles.cardImg}
                />
                <Text className="text-center font-semibold m-1 text-gray-300">
                  {item.day?.weekday}
                </Text>
                <Text className="text-center font-medium m-1 mb-2 text-white font-mono">
                  {"Max: "}
                  {item.day?.maxtemp_c}
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
    backgroundColor: "#587b81",
    borderRadius: 8,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    height: 142,
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
  cardImgMain: {
    justifyContent: "center",
    alignSelf: "center",
    height: 150,
    width: 150,
    margin: 5,
  },
});
