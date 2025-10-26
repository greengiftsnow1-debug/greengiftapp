import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const plants = [
  { id: '1', name: 'Peace Lily', price: 299, image: require('../../assets/plant1.jpg') },
  { id: '2', name: 'Areca Palm', price: 349, image: require('../../assets/plant1.jpg') },
  { id: '3', name: 'Snake Plant', price: 279, image: require('../../assets/plant1.jpg') },
  { id: '4', name: 'Money Plant', price: 199, image: require('../../assets/plant1.jpg') },
];

export default function ShopScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🪴 Shop Green Gifts</Text>

      <FlatList
        data={plants}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAF4', paddingHorizontal: 10, paddingTop: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', color: '#4CAF50', marginBottom: 20, textAlign: 'center' },
  row: { justifyContent: 'space-between' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: '100%', height: 100, borderRadius: 8 },
  name: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#333' },
  price: { fontSize: 14, color: '#4CAF50', marginBottom: 10 },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 14 },
});
