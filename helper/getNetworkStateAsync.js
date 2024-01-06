import * as Network from 'expo-network';

async function checkConnectivity() {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isInternetReachable;
}

export default checkConnectivity;
