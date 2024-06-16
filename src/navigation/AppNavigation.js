import React, { useEffect } from 'react'
import {
    NavigationContainer,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation'
import {
    ContactsScreen,
    FallbackScreen,
    ForumScreen,
    ImagesScreen,
    // OrderScreen,
    ProductsScreen,
    ProfileScreen,
    SplashScreen,
    StartScreen,
    VendorScreen,
    VendorsScreen,
} from '@screens'
import Icon from 'react-native-vector-icons/Ionicons'
import { navigationRef } from './RootNavigation'
import {
    useApp,
} from '@context'

const iconSize = 24

const VendorStack = createNativeStackNavigator()
const VendorStackScreen = () => (
    <VendorStack.Navigator
        initialRouteName='VendorList'
        screenOptions={{
            headerShown: false,
        }}
    >
        <VendorStack.Screen
            name='VendorList'
            children={props => <VendorsScreen {...props} />}
            // component={VendorsScreen}
            options={{ title: 'Vendors' }}
        />

        <VendorStack.Screen
            name='Vendor'
            children={props => <VendorScreen {...props} />}
            // component={VendorScreen}
            options={{
                title: 'Vendor',
                unmountOnBlur: true,
            }}
        />
        
    </VendorStack.Navigator>
)

const UserStack = createMaterialBottomTabNavigator()
const UserStackScreen = () => {
    const { theme } = useApp()
    return (
        <UserStack.Navigator
            initialRouteName={'Profile'}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                minWidth: 280,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >

            <UserStack.Screen
                name='Products'
                children={props => <ProductsScreen {...props} />}
                // component={ProductsScreen}
                options={{
                    tabBarLabel: 'Products',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <UserStack.Screen
                name='Profile'
                children={props => <ProfileScreen {...props} />}
                // component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <UserStack.Screen
                name='Images'
                children={props => <ImagesScreen {...props} />}
                // component={ImagesScreen}
                options={{
                    tabBarLabel: 'Images',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='alert-circle-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </UserStack.Navigator>
    )
}

const MainStack = createMaterialBottomTabNavigator()
const MainStackScreen = () => {
    const {
        theme,
        userId,
    } = useApp()
    
    return (
        <MainStack.Navigator
            initialRouteName={'Home'}
            activeColor={theme?.colors.tabActive}
            inactiveColor={theme?.colors.tabInactive}
            barStyle={{
                backgroundColor: 'transparent',
                width: '100%',
                minWidth: 280,
                maxWidth: 900,
                marginHorizontal: 'auto',
                elevation: 0,
            }}
            screenOptions={{
                headerShown: false,
            }}
        >

            <MainStack.Screen
                name='Home'
                children={props => <StartScreen {...props} />}
                // component={StartScreen}
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='home-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <MainStack.Screen
                name='Forum'
                children={props => <ForumScreen {...props} />}
                // component={ForumScreen}
                options={{
                    title: 'Forum',
                    tabBarLabel: 'Forum',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='chatbubbles-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <MainStack.Screen
                name='Vendors'
                children={props => <VendorStackScreen {...props} />}
                // component={VendorStackScreen}
                options={{
                    title: 'Vendors',
                    tabBarLabel: 'Vendors',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='restaurant-outline' size={iconSize} color={color} />
                    ),
                }}
            />

            <MainStack.Screen
                name='Users'
                children={props => <ContactsScreen {...props} />}
                // component={ContactsScreen}
                options={{
                    title: 'Contacts',
                    tabBarLabel: 'Contacts',
                    tabBarIcon: ({ focused, color }) => (
                        <Icon name='people-outline' size={iconSize} color={color} />
                    ),
                }}
            />

        </MainStack.Navigator>
    )
}

const AppStack = createNativeStackNavigator()
const AppStackScreen = () => {

    return (
        <AppStack.Navigator
            initialRouteName='Splash'
            screenOptions={{
                headerShown: false,
            }}
        >

            <AppStack.Screen
                name='Splash'
                children={props => <SplashScreen {...props} />}
                // component={SplashScreen}
                options={{ title: 'Splash' }}
            />

            <AppStack.Screen
                name='Start'
                children={props => <StartScreen {...props} secure={false} />}
                // component={StartScreen}
                options={{ title: 'Start' }}
            />

            <AppStack.Screen
                name='User'
                children={props => <UserStackScreen {...props} />}
                // component={UserStackScreen}
            />

            <AppStack.Screen
                name='Main'
                children={props => <MainStackScreen {...props} />}
                // component={MainStackScreen}
                options={{ title: 'Main' }}
            />

            <AppStack.Screen
                name='Fallback'
                children={props => <FallbackScreen {...props} />}
                // component={FallbackScreen}
                options={{ title: 'Oops' }}
            />

        </AppStack.Navigator>
    )
}

const linking = {
    // enabled: false,
    prefixes: ['https://iameric.me'],
    config: {
        screens: {
            User: {
                path: 'user',
                screens: {
                    Images: 'images',
                    Products: 'products',
                    Profile: 'profile',
                },
            },
            Main: {
                path: '',
                screens: {
                    Home: '',
                    Forum: 'forum',
                    Vendors: {
                        path: 'vendors',
                        screens: {
                            VendorList: '',
                            Vendor: '/:id',
                        },
                    },
                    // Orders: 'orders',
                    Users: 'users',
                },
            },
            Fallback: 'oops',
            Splash: 'splash',
            Start: 'start',
        },
    },
}

export default () => {
    
    const { theme } = useApp()
    
    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackScreen />}
            theme={theme}
        >
            <AppStackScreen />
        </NavigationContainer>
    )
}