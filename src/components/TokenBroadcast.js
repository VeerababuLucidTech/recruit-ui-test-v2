import React, { useEffect } from 'react';

const TokenBroadcast = () => {
    useEffect(() => {
        const broadcastChannel = new BroadcastChannel('auth_channel');
        broadcastChannel.postMessage({ token: sessionStorage.getItem('token') });

        return () => {
            broadcastChannel.close();
        };
    }, []);

    return null; // No rendering needed
};

export default TokenBroadcast;
