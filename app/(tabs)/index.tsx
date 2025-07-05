import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { FlatList, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const mockBalance = 1250; // Cambia este valor para probar negativo, 0 o positivo
const recentTransactions = [
  { id: '1', type: 'income', label: 'Sueldo', amount: 2000 },
  { id: '2', type: 'expense', label: 'Comida', amount: 350 },
  { id: '3', type: 'expense', label: 'Netflix', amount: 200 },
  { id: '4', type: 'income', label: 'Venta', amount: 400 },
];

const goals = [
  { id: 'g1', name: 'Ahorrar para viaje', target: 10000 },
  { id: 'g2', name: 'Fondo de emergencia', target: 5000 },
];

export default function HomeScreen() {
  const getBalanceColor = () => {
    if (mockBalance > 0) return '#4CAF50'; // Verde
    if (mockBalance < 0) return '#F44336'; // Rojo
    return '#9E9E9E'; // Gris
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        {/* Balance */}
        <ThemedView style={[styles.balanceContainer, { backgroundColor: getBalanceColor() }]}>
          <ThemedText type="title" style={styles.balanceText}>
            Balance actual: ${mockBalance}
          </ThemedText>
        </ThemedView>

        {/* Últimos movimientos */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Últimos movimientos</ThemedText>
          <FlatList
            data={recentTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionRow}>
                <Ionicons
                  name={item.type === 'income' ? 'arrow-up' : 'arrow-down'}
                  size={20}
                  color={item.type === 'income' ? '#4CAF50' : '#F44336'}
                />
                <ThemedText style={styles.transactionLabel}>{item.label}</ThemedText>
                <ThemedText style={{ color: item.type === 'income' ? '#4CAF50' : '#F44336' }}>
                  ${item.amount}
                </ThemedText>
              </View>
            )}
          />
        </ThemedView>

        {/* Metas */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Metas a cumplir</ThemedText>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <ThemedText>{goal.name}</ThemedText>
              <ThemedText style={{ fontWeight: 'bold' }}>${goal.target}</ThemedText>
            </View>
          ))}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 40,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  balanceContainer: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  balanceText: {
    color: 'white',
  },
  section: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    gap: 8,
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    gap: 8,
  },
  transactionLabel: {
    flex: 1,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
