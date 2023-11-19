import AsyncStorage from '@react-native-async-storage/async-storage'

export const cleanStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail'])
export const clearStorage = () => AsyncStorage.multiRemove(['userToken', 'route', 'detail', 'email'])