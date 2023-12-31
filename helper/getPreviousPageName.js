function getPreviousPageName(navigation) {
    const routes = navigation.getState()?.routes;
    const prevRoute = routes[routes.length - 2];
    return prevRoute?.name;
}

export default getPreviousPageName;
