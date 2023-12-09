import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const toast = useToast();

    const history = useHistory();

    const handleLoginSubmit = async () => {
        if (!email || !password) {
            toast({
                title: 'Please enter all the required fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }
        setLoading(true);
        try {
            const loginResponse = await axios.post('/api/user/login',
                { email, password },
                { headers: { 'Content-Type': 'application/json' } });
            toast({
                title: 'Login Successful!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            localStorage.setItem('userInfo', JSON.stringify(loginResponse.data));
            history.push('/chats');
        } catch (error) {
            console.log('Error logging in user: ', error);
            toast({
                title: 'Error logging in user!',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
        setLoading(false);
    };

    return (
        <VStack
            spacing='5'
        >
            <FormControl
                id='email'
                isRequired
            >
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>

            <FormControl
                id='password'
                isRequired
            >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement
                        w='4.5rem'
                    >
                        <Button
                            h='1.75rem'
                            size='sm'
                            onClick={handleShowPassword}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme='blue'
                w='100%'
                marginTop='15'
                onClick={handleLoginSubmit}
                loading={loading}
            >
                Login
            </Button>

            {/* Remove */}
            <Button
                colorScheme='red'
                w='100%'
                marginTop='15'
                onClick={() => {
                    setEmail('guest@gmail.com');
                    setPassword('1234');
                }}
            >
                Input Guest Credentials // Remove
            </Button>
            {/* Remove */}
        </VStack>
    )
}

export default Login