function BannerAdComponent() {
    const {BannerAd, BannerAdSize, TestIds} = require('react-native-google-mobile-ads');
    const adUnitId = 'ca-app-pub-5499479031752321/9692031539';
    return (
        <BannerAd
        size={BannerAdSize.BANNER}
        unitId={adUnitId}
        testDevices={[TestIds.SIMULATOR]}
        onAdLoaded={() => {
          // Ad has loaded successfully
        }}
        onAdFailedToLoad={(error) => {
          console.error('Ad failed to load: ', error);
        }}
        style={{
        // make it bottom of the page
        position: 'absolute',
        bottom: 0,
        // make it center
        justifyContent: 'center',
        // make it center
        alignSelf: 'center',
    }}
      />
    );
}

export default BannerAdComponent;