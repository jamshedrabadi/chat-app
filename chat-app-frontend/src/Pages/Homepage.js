import React from 'react'
import { Container, Box, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/Login.js';
import SignUp from '../components/authentication/SignUp.js';

const Homepage = () => {
    return (
        <Container
            maxW='xl'
            centerContent
        >
            <Box
                display='flex'
                justifyContent='center'
                p='3'
                bg='white'
                w='100%'
                m='40px 0 15px 0'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Text
                    fontSize='4xl'
                    fontFamily='Work sans'
                >
                    Chat App
                </Text>
            </Box>

            <Box
                bg='white'
                w='100%'
                p='4'
                borderRadius='lg'
                borderWidth='1px'
            >
                <Tabs variant='soft-rounded'>
                    <TabList
                        mb='1em'
                    >
                        <Tab w='50%'>Login</Tab>
                        <Tab w='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel><Login /></TabPanel>
                        <TabPanel><SignUp /></TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Homepage