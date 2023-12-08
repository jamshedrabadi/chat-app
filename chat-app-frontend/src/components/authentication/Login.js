import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleLoginSubmit = () => { };

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