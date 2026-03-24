import { Tabs } from 'expo-router';
import { Text, TouchableOpacity, View, Image, Modal, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Custom Tab Bar Component
function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#E5E5EA',
      paddingBottom: 8,
      paddingTop: 8,
      height: 80,
      width: '100%',
    }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {options.tabBarIcon?.({ 
              color: isFocused ? '#007AFF' : '#8E8E93', 
              size: 28 
            })}
            <Text style={{
              color: isFocused ? '#007AFF' : '#8E8E93',
              fontSize: 13,
              fontWeight: '500',
              marginTop: 6,
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// Custom Drawer Component
function CustomDrawer({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, slideAnim]);

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route);
  };

  const menuItems = [
    { title: 'Home', icon: '🏠', route: '/(tabs)', color: '#007AFF' },
    { title: 'Favorites', icon: '❤️', route: '/(tabs)/favorites', color: '#FF6B6B' },
    { title: 'A/L Papers', icon: '🎓', route: '/al', color: '#4ECDC4' },
    { title: 'O/L Papers', icon: '📚', route: '/ol', color: '#45B7D1' },
    { title: 'Scholarship', icon: '🏆', route: '/scholarship', color: '#96CEB4' },
    { title: 'About Us', icon: 'ℹ️', route: '/about', color: '#FFEAA7' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.drawerOverlay}>
        <TouchableOpacity 
          style={styles.drawerBackdrop} 
          onPress={onClose}
          activeOpacity={1}
        />
        <Animated.View 
          style={[
            styles.drawerContent,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <View style={styles.drawerHeader}>
            <Image 
              source={require('../../assets/images/logo.png')}
              style={styles.drawerLogo}
            />
            {/* <Text style={styles.drawerTitle}>Iskolelk</Text> */}
          </View>
          
          <View style={styles.drawerMenu}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.7}
              >
                <Text style={[styles.menuIcon, { color: item.color }]}>
                  {item.icon}
                </Text>
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

// Custom Header Component with Logo and Menu Button
function CustomHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <View style={{
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
        flexDirection: 'row',
      }}>
        {/* Hamburger Menu Button */}
        <TouchableOpacity 
          onPress={() => setDrawerVisible(true)}
          style={{
            padding: 8,
            borderRadius: 8,
          }}
        >
          <Ionicons name="menu" size={38} color="#333" />
        </TouchableOpacity>

        {/* Logo - Centered */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image 
            source={require('../../assets/images/logo.png')}
            style={{
              width: 140,
              height: 100,
              resizeMode: 'contain',
            }}
          />
        </View>

        {/* Spacer to balance the layout */}
        <View style={{ width: 40 }} />
      </View>

      {/* Custom Drawer */}
      <CustomDrawer 
        visible={drawerVisible} 
        onClose={() => setDrawerVisible(false)} 
      />
    </>
  );
}

const styles = {
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerBackdrop: {
    flex: 1,
  },
  drawerContent: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    alignItems: 'center' as const,
  },
  drawerLogo: {
    width: 140,
    height: 100,
    resizeMode: 'contain' as const,
    marginBottom: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#333',
  },
  drawerMenu: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
    width: 30,
    textAlign: 'center' as const,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500' as const,
    color: '#333',
  },
};

export default function TabsLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerTitleAlign: 'center',
        header: () => <CustomHeader />,
      }}
      tabBar={CustomTabBar}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>🏠</Text>
          ),
        }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ 
          title: 'Favorites',
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ color, fontSize: size }}>❤️</Text>
          ),
        }} 
      />
    </Tabs>
  );
}
