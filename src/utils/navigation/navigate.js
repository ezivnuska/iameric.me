export default navigate = async (nextRoute, params) => {
    if (navigationRef.isReady()) {
        if (params) navigationRef.navigate(nextRoute, params)
        else navigationRef.navigate(nextRoute)
        return
    }
}