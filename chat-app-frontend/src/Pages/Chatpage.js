import React, { useEffect } from 'react';
import axios from 'axios';

const Chatpage = () => {
    const fetchChats = async () => {
        console.log('kek');
        const data = await axios.get('/api/chat');
        console.log('data --- ', data)
    }

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>Chat Page</div>
    )
}

export default Chatpage