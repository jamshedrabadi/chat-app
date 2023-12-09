import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [img, setImg] = useState();
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const toast = useToast();

    const history = useHistory();

    const handleImageUpload = async (img) => {
        const imageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!img || !imageTypes.includes(img.type)) {
            toast({
                title: 'Please select an image!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", 'chat_app');
        data.append("cloud_name", 'drujfmqui');
        setLoading(true);
        try {
            const imageResponse = await axios.post('https://api.cloudinary.com/v1_1/drujfmqui/image/upload', data);
            setImg(imageResponse.data.url.toString());
        } catch (error) {
            console.log('Error uploading image: ', error);
            toast({
                title: 'Error uploading image!',
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
        }
        setLoading(false);
    };

    const handleSignUpSubmit = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please enter all the required fields!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match!',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }
        setLoading(true);
        try {
            const signUpResponse = await axios.post('/api/user/register',
                { name, email, password, img },
                { headers: { 'Content-Type': 'application/json' } });
            toast({
                title: 'Registration Successful!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'top-right',
            });
            localStorage.setItem('userInfo', JSON.stringify(signUpResponse.data));
            history.push('/chats');
        } catch (error) {
            console.log('Error registering user: ', error);
            toast({
                title: 'Error registering user!',
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
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme='blue'
                w='100%'
                marginTop='15'
                onClick={handleSignUpSubmit}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp