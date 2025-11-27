import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCart } from "../../contexts/cartContext";

const { width } = Dimensions.get("window");

type Item = {
  id: string;
  name: string;
  price: number;
  image: any;
};

const banners = [
  require("../../assets/banner1.jpg"),
  require("../../assets/banner2.jpg"),
  require("../../assets/banner3.jpg"),
];

const plantItems: Item[] = [
  { id: "plant1", name: "Spider Plant", price: 50, image: require("../../assets/plants/Spider.jpg") },
  { id: "plant2", name: "Peace Lily", price: 400, image: require("../../assets/plants/Peace Lily.jpg") },
  { id: "plant3", name: "Jade Plant", price: 50, image: require("../../assets/plants/plant4.jpg") },
  { id: "plant4", name: "Aloe Vera", price: 50, image: require("../../assets/plants/Aloe Vera.jpg") },
  { id: "plant5", name: "Ajwain", price: 50, image: require("../../assets/plants/Ajwain.jpg") },
  { id: "plant6", name: "Aralia", price: 50, image: require("../../assets/plants/Aralia.jpg") },
  { id: "plant7", name: "Begonia", price: 50, image: require("../../assets/plants/Begonia.jpeg") },
  { id: "plant8", name: "lakshmikamal", price: 300, image: require("../../assets/plants/lakshmikamal.jpg") },
  { id: "plant9", name: "Lucky Bamboo", price: 300, image: require("../../assets/plants/lucky bamboo.jpg") },
  { id: "plant10", name: "cuphea", price: 50, image: require("../../assets/plants/cuphea.jpg") },
  { id: "plant11", name: "Nagdone", price: 50, image: require("../../assets/plants/Nagdone.jpeg") },
  { id: "plant12", name: "Ishnobush", price: 50, image: require("../../assets/plants/snowbush.jpeg") },
  { id: "plant13", name: "Jatropha", price: 50, image: require("../../assets/plants/jatropha.webp") },
  { id: "plant14", name: "coleus", price: 50, image: require("../../assets/plants/coleus.jpg") },
  { id: "plant15", name: "Syngonium", price: 80, image: require("../../assets/plants/syngoniumm.jpg") },
];

const potItems: Item[] = [
  { id: "pot1", name: "Arty Pot", price: 61, image: require("../../assets/pots/pot1 (1).jpeg") },
  { id: "pot2", name: "Arty Pot", price: 61, image: require("../../assets/pots/pot1 (2).jpeg") },
  { id: "pot3", name: "Arty Pot", price: 61, image: require("../../assets/pots/pot1 (6).jpeg") },
  { id: "pot4", name: "Arty Pot", price: 61, image: require("../../assets/pots/pot1 (8).jpeg") },
  { id: "pot5", name: "Arty Pot", price: 61, image: require("../../assets/pots/pot1 (16).jpeg") },

  { id: "pot6", name: "Valencia Blue", price: 38, image: require("../../assets/pots/pot1 (4).jpeg") },
  { id: "pot7", name: "Valencia Green", price: 38, image: require("../../assets/pots/pot1 (5).jpeg") },
  { id: "pot8", name: "Valencia Brown", price: 38, image: require("../../assets/pots/pot1 (9).jpeg") },
  { id: "pot9", name: "Valencia Yellow", price: 38, image: require("../../assets/pots/pot1 (11).jpeg") },

  { id: "pot10", name: "Valencia White", price: 49, image: require("../../assets/pots/Valencia White.png") },
  { id: "pot11", name: "Valencia Red", price: 49, image: require("../../assets/pots/Valencia Red.png") },
  { id: "pot12", name: "Valencia OffWhite", price: 49, image: require("../../assets/pots/Valencia Offwhite.png") },
  { id: "pot13", name: "Valencia OliveGreen", price: 49, image: require("../../assets/pots/Valencia Olivegreen.png") },
  { id: "pot14", name: "Valencia Mahroon", price: 49, image: require("../../assets/pots/Valencia Mahroon.png") },
  { id: "pot15", name: "Valencia Pink", price: 49, image: require("../../assets/pots/Valencia Pink.png") },
  { id: "pot16", name: "Valencia Gray", price: 49, image: require("../../assets/pots/Valencia Gray.png") },

  { id: "pot17", name: "Ibiza Eco Yellow", price: 44, image: require("../../assets/pots/Ibiza Eco Yellow.jpeg") },
  { id: "pot18", name: "Ibiza Eco Blue", price: 44, image: require("../../assets/pots/Ibiza Eco Blue.jpeg") },
  { id: "pot19", name: "Ibiza Eco White", price: 44, image: require("../../assets/pots/Ibiza Eco White.jpeg") },
  { id: "pot20", name: "Ibiza Eco Purple", price: 44, image: require("../../assets/pots/Ibiza Eco Purple.jpeg") },

  { id: "pot21", name: "Ibiza Eco Maroon", price: 44, image: require("../../assets/pots/pot1 (7).jpeg") },
  { id: "pot22", name: "Ibiza Eco Green", price: 44, image: require("../../assets/pots/pot1 (12).jpeg") },
  { id: "pot23", name: "Ibiza Eco Brown", price: 44, image: require("../../assets/pots/pot1 (17).jpeg") },

  { id: "pot24", name: "Million Pot", price: 40, image: require("../../assets/pots/pot1 (14).jpeg") },

  { id: "pot25", name: "Tancy Pot", price: 49, image: require("../../assets/pots/tancy1.png") },
  { id: "pot26", name: "Tancy Pot", price: 49, image: require("../../assets/pots/tancy2.png") },
  { id: "pot27", name: "Tancy Pot", price: 49, image: require("../../assets/pots/tancy3.png") },
  { id: "pot28", name: "Tancy Pot", price: 49, image: require("../../assets/pots/tancy4.png") },
];

const packagingItems: Item[] = [
  { id: "pack1", name: "Packging1", price: 60, image: require("../../assets/packging1.jpeg") },
  { id: "pack2", name: "Packging2", price: 50, image: require("../../assets/pack2.png") },
  { id: "pack3", name: "Packging3", price: 50, image: require("../../assets/pack3.png") },
];

const cardItems: Item[] = [
  { id: "card1", name: "Thank You Card", price: 20, image: require("../../assets/card1.jpg") },
  { id: "card2", name: "Birthday Card", price: 20, image: require("../../assets/card2.jpg") },
  { id: "card3", name: "Birthday Card", price: 20, image: require("../../assets/card3.jpg") },
  { id: "card4", name: "Birthday Card", price: 20, image: require("../../assets/card4.jpg") },
  { id: "card5", name: "Valentine Card", price: 20, image: require("../../assets/card5.jpg") },
  { id: "card6", name: "Valentine Card", price: 20, image: require("../../assets/card6.jpg") },
  { id: "card7", name: "Thankyou Card1", price: 20, image: require("../../assets/card7.jpg") },
  { id: "card8", name: "Thankyou Card2", price: 20, image: require("../../assets/card8.jpg") },
  { id: "card9", name: "Best Wishes Card", price: 20, image: require("../../assets/card9.jpg") },
];

export default function HomeScreen() {
  const { addToCart } = useCart();
  const router = useRouter();

  const [fadeAnim] = useState(new Animated.Value(0));
  const [message, setMessage] = useState("");
  const [currentBanner, setCurrentBanner] = useState(0);

  const [customSelection, setCustomSelection] = useState<{
    plant: Item | null;
    pot: Item | null;
    pack: Item | null;
    card: Item | null;
  }>({
    plant: null,
    pot: null,
    pack: null,
    card: null,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const selectItem = (type: "plant" | "pot" | "pack" | "card", item: Item) => {
    setCustomSelection((prev) => ({ ...prev, [type]: item }));
  };

  const handleCheckout = () => {
    const selectedItems = Object.values(customSelection).filter(Boolean) as Item[];

    if (selectedItems.length === 0) {
      alert("Please select at least one item");
      return;
    }

    selectedItems.forEach((item) => addToCart(item));

    if (message.trim()) {
      addToCart({
        id: "message",
        name: "Custom Message",
        price: 0,
        image: "",
        message,
      } as any);
    }

    router.push("/(tabs)/cart");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        {/* 🔥 Premium Top Navbar */}
        {/* 🔥 Premium Top Navbar */}
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  }}
>
  <Image
    source={require("../../assets/logo.png")}
    style={{ width: 130, height: 40, resizeMode: "contain" }}
  />

  <TouchableOpacity>
    <Ionicons name="search-outline" size={28} color="#333" />
  </TouchableOpacity>
</View>


        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>

          <Image
            source={banners[currentBanner]}
            style={styles.banner}
            resizeMode="cover"
          />

          <Text style={styles.sectionTitle}>Choose Your Plant</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
            {plantItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem("plant", item)}>
                <Image source={item.image} style={styles.itemImage} />
                <Text>{item.name}</Text>
                <Text>₹{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Choose Your Pot</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
            {potItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem("pot", item)}>
                <Image source={item.image} style={styles.itemImage} />
                <Text>{item.name}</Text>
                <Text>₹{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Choose Packaging</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
            {packagingItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem("pack", item)}>
                <Image source={item.image} style={styles.itemImage} />
                <Text>{item.name}</Text>
                <Text>₹{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Choose a Card</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
            {cardItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem("card", item)}>
                <Image source={item.image} style={styles.itemImage} />
                <Text>{item.name}</Text>
                <Text>₹{item.price}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Write Your Message</Text>
          <TextInput
            style={styles.input}
            placeholder="Write a message for the recipient..."
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <Text style={styles.sectionTitle}>Your Custom Gift:</Text>
          <View style={styles.previewBox}>
            {Object.entries(customSelection).map(([key, item]) =>
              item ? (
                <Text key={key} style={styles.previewText}>
                  ✅ {key}: {item.name} - ₹{item.price}
                </Text>
              ) : null
            )}
            {message.length > 0 && (
              <Text style={styles.previewText}>💌 Message: {message}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Add to Cart & Checkout</Text>
          </TouchableOpacity>

        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1 },
  banner: { width: 300, height: 250, alignSelf: "center", borderRadius: 10, marginVertical: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  scrollRow: { paddingLeft: 16 },
  itemCard: {
    backgroundColor: "#F1F8E9",
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    width: 140,
    alignItems: "center",
  },
  itemImage: { width: 100, height: 100, borderRadius: 8 },
  input: {
    marginHorizontal: 16,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
  },
  previewBox: {
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: "#E8F5E9",
    borderRadius: 8,
    marginBottom: 16,
  },
  previewText: { fontSize: 14, marginBottom: 4 },
  checkoutButton: {
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
