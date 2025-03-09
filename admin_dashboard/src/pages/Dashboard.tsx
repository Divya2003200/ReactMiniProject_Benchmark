
import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  Heading,
  Flex,
  Button,
  Container,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/UserEditstore";

interface StatCardProps {
  label: string;
  link: string;
}

const Dashboard: React.FC = () => {
  const { logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

 
  const bg = useColorModeValue("gray.50", "gray.800");
  const headerBg = useColorModeValue("blue.300", "blue.300");
  const headerColor = "white";

  return (
   
    <Box width="100vw" minH="100vh" bg={bg} display="flex" flexDirection="column">
 
      <Flex
        as="header"
        w="100%"
        px={8}
        py={4}
        bg={headerBg}
        color={headerColor}
        align="center"
        justify="space-between"
        boxShadow="md"
      >
        <Heading as="h1" size="lg">
          Admin Dashboard
        </Heading>
        <Button
          onClick={handleLogout}
          colorScheme="red"
          variant="outline"
          _hover={{ bg: "red.500", color: "white" }}
        >
          Logout
        </Button>
      </Flex>

 
      <Box flex="1" py={10}>
        <Container maxW="container.xl">
          <VStack spacing={10}>
            <Heading as="h2" size="md">
              Welcome to your dashboard!
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} w="100%">
              <StatCard label="Products" link="/products" />
              <StatCard label="Users" link="/users" />
              <StatCard label="Orders" link="/orders" />
              <StatCard label="Carts" link="/carts" />
              <StatCard label="Blogs & Comments" link="/posts" />
              <StatCard label="Quotes & Recipes" link="/quotes-recipes" />
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

   
      <Box as="footer" py={4} textAlign="center" bg={headerBg} color={headerColor}>
        &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
      </Box>
    </Box>
  );
};

const StatCard: React.FC<StatCardProps> = ({ label, link }) => {
  const cardBg = useColorModeValue("white", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  return (
    <Link to={link}>
      <Box
        p={6}
        bg={cardBg}
        boxShadow="lg"
        borderRadius="md"
        textAlign="center"
        transition="background 0.2s ease, transform 0.2s ease"
        _hover={{ bg: hoverBg, transform: "scale(1.02)" }}
        cursor="pointer"
      >
        <Stat>
          <StatLabel fontSize="lg" fontWeight="semibold">
            {label}
          </StatLabel>
        </Stat>
      </Box>
    </Link>
  );
};

export default Dashboard;
