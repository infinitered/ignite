import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

/**
 * Hook returning current network connectivity. Use to gate features
 * that require connectivity or to render the OfflineBanner.
 */
export function useIsOnline(): boolean {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    NetInfo.fetch().then(handleState);
    const unsubscribe = NetInfo.addEventListener(handleState);
    return unsubscribe;

    function handleState(state: NetInfoState) {
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable !== false));
    }
  }, []);

  return isOnline;
}
