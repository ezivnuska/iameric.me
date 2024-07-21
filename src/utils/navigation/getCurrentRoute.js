export default getCurrentRoute = async () => {
    if (navigationRef.isReady()) {
        const route = await navigationRef.getCurrentRoute()
        return route
    }
}