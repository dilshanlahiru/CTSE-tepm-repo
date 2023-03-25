import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Image,
  FlatList,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase/Firebse-config";
import { Linking } from "react-native";

export default function ViewAppointmentAdmin() {
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsedItem = async () => {
      const data = await getDocs(collection(db, "Appointment"));
      setAllItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };
    getUsedItem();
  }, []);

  const updateState1 = async (item) => {
    try {
      const stateUpdateRef = doc(db, "Appointment", item.id);
      await updateDoc(stateUpdateRef, {
        status: "Accepted",
      });
      ToastAndroid.show("Successfully updated status!", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const updateState2 = async (item) => {
    try {
      const stateUpdateRef = doc(db, "Appointment", item.id);
      await updateDoc(stateUpdateRef, {
        status: "Rejected",
      });
      ToastAndroid.show("successfully updated status!", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const GetConfirmationAccepted = (item) => {
    Alert.alert("Confirm!", "Are you sure you want to update status?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => updateState1(item),
      },
    ]);
  };
  const GetConfirmationReject = (item) => {
    Alert.alert("Confirm!", "Are you sure you want to update status?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => updateState2(item),
      },
    ]);
  };

  const Call = (item) => {
    Linking.openURL(`tel:${item.phone}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3669C9" />
      </View>
    );
  }

  if (!loading && allItems.length === 0) {
    return (
      <View>
        <TouchableOpacity
          style={styles.createAppointmentButton}
          onPress={() => navigation.navigate("AddAppointmentPage")}
        >
          <Text style={styles.createAppointmentButtonText}>
            CREATE APPOINTMENT
          </Text>
        </TouchableOpacity>
        <Text style={styles.noItemsText}>No found data</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={{
          margin: 10,
          borderRadius: 10,
          paddingVertical: 10,
          backgroundColor: "#3669C9",
          alignItems: "center",
        }}
        //onPress={() => navigation.navigate("AddAppointmentPage")}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="add-circle" size={30} color="#fff" />
          <Text
            style={{
              color: "#fff",
              marginLeft: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            CREATE APPOINTMENT
          </Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={allItems}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.status}>{item.status}</Text>
              <Text style={styles.title}>{item.reasons}</Text>
              <Text style={styles.subtitle}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.phone}</Text>
              {/* <Text style={styles.subtitle}>{item.date}</Text>
                <Text style={styles.subtitle}>{item.time}</Text> */}
              <Text style={styles.subtitle}>{item.discription}</Text>
              {/* <Text style={styles.status}>{item.status}</Text> */}
            </View>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "red" }]}
                onPress={() => GetConfirmationReject(item)}
              >
                <Text style={styles.cardButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "green" }]}
                onPress={() => GetConfirmationAccepted(item)}
              >
                <Text style={styles.cardButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.cardButton, { backgroundColor: "blue" }]}
                onPress={() => Call(item)}
              >
                <Text style={styles.cardButtonText}>Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  addButton: {
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#3669C9",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  status: {
    padding: 7,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: "bold",
    color: "#666",
    marginTop: 10,
    backgroundColor: "#7F8487",
  },
  cardContent: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 17,
    marginBottom: 5,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cardButton: {
    marginHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsText: {
    fontSize: 15,
    textAlign: "center",
    marginVertical: 10,
  },
  createAppointmentButton: {
    margin: 10,
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: "#3669C9",
    alignItems: "center",
  },
  createAppointmentButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
});
