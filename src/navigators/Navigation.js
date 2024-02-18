import React, { useContext, useEffect } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
    DetailsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    OrderScreen,
    ProductsScreen,
    SettingsScreen,
    StartScreen,
    UsersScreen,
    VendorScreen,
    VendorsScreen,
} from '../screens'
import { navigationRef } from './RootNavigation'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'
import { AppContext } from '../AppContext'
import { useTheme } from 'react-native-paper'

const UsersStack = createNativeStackNavigator()
const UsersStackScreen = ({ route, navigation, id, title, username }) => {
    return (
        <UsersStack.Navigator
            initialRouteName='UserList'
            screenOptions={{
                headerShown: false,
            }}
        >
            <UsersStack.Screen
                name='UserList'
                children={() => <UsersScreen title={title} />}
                // component={UsersScreen}
                // options={{ title }}
            />

            <UsersStack.Screen
                name='User'
                children={props => <DetailsScreen {...props} title={title} username={username} id={id} />}
                // component={DetailsScreen}
                // options={{ title }}
            />
            
        </UsersStack.Navigator>
    )
}

const VendorsStack = createNativeStackNavigator()
const VendorsStackScreen = ({ title }) => (
    <VendorsStack.Navigator
        initialRouteName='VendorList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <VendorsStack.Screen
            name='VendorList'
            component={VendorsScreen}
            options={{ title: 'Vendors' }}
        />

        <VendorsStack.Screen
            name='Vendor'
            children={props => <VendorScreen {...props}title={username} />}
            // component={VendorScreen}
            // options={{ title: 'Vendor' }}
        />
        
    </VendorsStack.Navigator>
)

const ProductsStack = createNativeStackNavigator()
const ProductsStackScreen = () => (
    <ProductsStack.Navigator
        initialRouteName='ProductList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <ProductsStack.Screen
            name='ProductList'
            component={ProductsScreen}
            options={{ title: 'Products' }}
        />
        
    </ProductsStack.Navigator>
)

const getTitle = role => {
    switch (role) {
        case 'customer': return 'Customers'; break
        case 'vendor': return 'Merchants'; break
        case 'driver': return 'Drivers'; break
        default: return 'Users'
    }
}

const PrivateStack = createMaterialBottomTabNavigator()
// const PrivateStack = createBottomTabNavigator()
const PrivateStackScreen = () => {

    const theme = useTheme()

    const { user } = useContext(AppContext)
    const iconSize = 24
    
    if (!user) return null

    return (
        <PrivateStack.Navigator
            initialRouteName={user.role === 'customer' ? 'Vendors' : 'Orders'}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                // alignItems: 'stretch',
                width: 375,
                minWidth: 300,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <PrivateStack.Screen
                name='Orders'
                component={OrderScreen}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            {user.role === 'vendor' && (
                <PrivateStack.Screen
                    name='Products'
                    component={ProductsStackScreen}
                    options={{
                        tabBarLabel: 'Products',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='grid-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            {(user.role === 'customer' || user.role === 'admin') && (
                <PrivateStack.Screen
                    name='Vendors'
                    component={VendorsStackScreen}
                    options={{
                        tabBarLabel: 'Merchants',
                        tabBarIcon: ({ focused, color }) => (
                            <Icon name='fast-food-outline' size={iconSize} color={color} />
                        ),
                    }}
                />
            )}

            <PrivateStack.Screen
                name='Users'
                // component={UsersStackScreen}
                children={() => (
                    <UsersStackScreen
                        title={getTitle(user.role)}
                        username={user.username}
                        id={user._id}
                    />
                )}
                options={({ route, navigation }) => ({
                    tabBarLabel: getTitle(user.role),
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-circle-outline' size={iconSize} color={color} />
                    ),
                  })}
            />

            <PrivateStack.Screen
                name='Forum'
                component={ForumScreen}
                options={{
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubble-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <PrivateStack.Screen
                name='Images'
                component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='images-outline' size={iconSize} color={color} />
                    ),
                }}
            />
            
            <PrivateStack.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='cog' size={iconSize} color={color} />
                    ),
                }}
            />

        </PrivateStack.Navigator>
    )
}

const MainStack = createNativeStackNavigator()
const MainStackScreen = () => (
    <MainStack.Navigator
        initialRouteName='Start'
        screenOptions={() => ({
            headerShown: false,
        })}
    >

        <MainStack.Screen
            name='Start'
            component={StartScreen}
            options={{ title: 'Start' }}
        />

        <MainStack.Screen
            name='Private'
            component={PrivateStackScreen}
            options={{ title: 'Private' }}
        />
        
    </MainStack.Navigator>
)

const config = {
    screens: {
        Start: 'start',
        Private: {
            path: '',
            screens: {
                Orders: {
                    path: 'orders',
                    screens: {
                        OrderList: '',
                    },
                },
                Products: {
                    path: 'products',
                    screens: {
                        ProductList: '',
                    },
                },
                Vendors: {
                    path: 'vendors',
                    screens: {
                        VendorList: '',
                        Vendor: '/:id',
                    },
                },
                Users: {
                    path: 'users',
                    screens: {
                        UserList: '',
                        User: '/:id',
                    },
                },
                Forum: 'forum',
                Images: 'images',
                Settings: 'settings',
            },
        },
    },
}

export default () => {

    const {
        user,
    } = useContext(AppContext)
    
    useEffect(() => {
        if (user) {
            console.log(`${user.username} connected.`)
            navigationRef.navigate('Private')
        }
        else {
            console.log('no user connected.')
            navigationRef.navigate('Start')
        }
    }, [user])

    const linking = {
        prefixes: ['https://iameric.me'],
        config,
    }

    const theme = useTheme()

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
            // onStateChange={async state => {}}
        >
            <MainStackScreen />
        </NavigationContainer>
    )
}