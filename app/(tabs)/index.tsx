import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';

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
} from 'react-native';
import { useCart } from '../../contexts/cartContext';



const { width } = Dimensions.get('window');

type Item = {
  id: string;
  name: string;
  price: number;
  image: any;
};

// ✅ Banners
const banners = [
  require('../../assets/banner1.jpg'),
  require('../../assets/banner2.jpg'),
  require('../../assets/banner3.jpg'),
];

// ✅ Product Sections
const plantItems: Item[] = [
  { id: 'plant1', name: 'Jade Plant', price: 250, image: require('../../assets/jade.jpg') },
  { id: 'plant2', name: 'Snake Plant', price: 300, image: require('../../assets/plant1.jpg') },
  { id: 'plant3', name: 'chlorophytum', price: 300, image: require('../../assets/chlorophytum.jpg') },
  { id: 'plant4', name: 'ericapalm', price: 300, image: require('../../assets/ericapalm.jpg') },
];

const potItems: Item[] = [
  { id: 'pot1', name: 'Clay Pot', price: 100, image: require('../../assets/pot1.jpg') },
  { id: 'pot2', name: 'Ceramic Pot', price: 180, image: require('../../assets/pot2.jpg') },
];

const packagingItems: Item[] = [
  { id: 'pack1', name: 'Jute Wrap', price: 50, image: require('../../assets/pack1.jpg') },
  { id: 'pack2', name: 'Box Pack', price: 80, image: require('../../assets/pack2.jpeg') },
];

const cardItems: Item[] = [
  { id: 'card1', name: 'Thank You Card', price: 20, image: require('../../assets/card1.jpg') },
  { id: 'card2', name: 'Birthday Card', price: 25, image: require('../../assets/card2.jpg') },
  { id: 'card3', name: 'Birthday Card', price: 25, image: require('../../assets/card3.jpg') },
  { id: 'card4', name: 'Birthday Card', price: 25, image: require('../../assets/card4.jpg') },
  { id: 'card5', name: 'valentineday Card', price: 25, image: require('../../assets/card5.jpg') },
  { id: 'card6', name: 'valentineday Card', price: 25, image: require('../../assets/card6.jpg') },
  { id: 'card7', name: 'Anniversery Card', price: 25, image: require('../../assets/card7.jpg') },
  { id: 'card8', name: 'Birthday Card', price: 25, image: require('../../assets/card8.jpg') },
  { id: 'card9', name: 'Birthday Card', price: 25, image: require('../../assets/card9.jpg') },
  { id: 'card10', name: 'Anniversery Card', price: 25, image: require('../../assets/card10.jpg') },
  { id: 'card11', name: 'Anniversery Card', price: 25, image: require('../../assets/card11.jpg') },
  { id: 'card12', name: 'Anniversery Card', price: 25, image: require('../../assets/card12.jpg') },
  
];

export default function HomeScreen() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [message, setMessage] = useState('');
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

  const selectItem = (type: 'plant' | 'pot' | 'pack' | 'card', item: Item) => {
    setCustomSelection((prev) => ({ ...prev, [type]: item }));
  };

  const handleCheckout = () => {
    const selectedItems = Object.values(customSelection).filter(Boolean) as Item[];
    if (selectedItems.length === 0) {
      alert('Please select at least one item before checkout.');
      return;
    }

    selectedItems.forEach((item) => addToCart(item));
    if (message.trim()) {
      addToCart({ id: 'message', name: 'Custom Message', price: 0, image: '', message } as any);
    }

    router.push('/(tabs)/cart');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <ScrollView>
        <Image source={banners[currentBanner]} style={styles.banner} resizeMode="cover" />

        <Text style={styles.sectionTitle}>Choose Your Plant</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {plantItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem('plant', item)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text>{item.name}</Text>
              <Text>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Choose Your Pot</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {potItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem('pot', item)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text>{item.name}</Text>
              <Text>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Choose Packaging</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {packagingItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem('pack', item)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text>{item.name}</Text>
              <Text>₹{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Choose a Card</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {cardItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard} onPress={() => selectItem('card', item)}>
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
          {message.length > 0 && <Text style={styles.previewText}>💌 Message: {message}</Text>}
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Add to Cart & Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1 },
  banner: { width: 300, height: 250, alignSelf: 'center', borderRadius: 10, marginVertical: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  scrollRow: { paddingLeft: 16 },
  itemCard: {
    backgroundColor: '#F1F8E9',
    marginRight: 16,
    padding: 12,
    borderRadius: 12,
    width: 140,
    alignItems: 'center',
  },
  itemImage: { width: 100, height: 100, borderRadius: 8 },
  input: {
    marginHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 80,
  },
  previewBox: {
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    marginBottom: 16,
  },
  previewText: {
    fontSize: 14,
    marginBottom: 4,
  },
  checkoutButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
