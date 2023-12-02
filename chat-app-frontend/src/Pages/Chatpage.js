import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chatpage = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        console.log('kek');
        const { data } = await axios.get('/api/chat');
        console.log('data --- ', data)
        setChats(data);
    }

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.map((chat) => <div key={chat.id}>{chat.name}</div>)}
        </div>
    )
}

export default Chatpage