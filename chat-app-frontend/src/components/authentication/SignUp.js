import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [img, setImg] = useState();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const postDetails = (img) => { };

    const handleSignUpSubmit = () => { };

    return (
        <VStack
            spacing='5'
        >
            <FormControl
                id='name'
                isRequired
            >
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

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

            <FormControl
                id='confirm-password'
                isRequired
            >
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement
                        w='4.5rem'
                    >
                        <Button
                            h='1.75rem'
                            size='sm'
                            onClick={handleShowConfirmPassword}
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl
                id='img'
            >
                <FormLabel>Upload Image</FormLabel>
                <Input
                    type='file'
                    accept='image/*'
                    p='1'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme='blue'
                w='100%'
                marginTop='15'
                onClick={handleSignUpSubmit}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp