
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserStore } from '../stores/UserEditstore';
import { loginUser } from '../Api/usersapi';
import { useNavigate } from "react-router-dom";
import { Button, Input, FormControl, FormLabel, FormErrorMessage,Box,Text, Flex, Heading, useColorModeValue
} from "@chakra-ui/react";

interface LoginFormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const { login, auth } = useUserStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard");
    }
  }, [auth.token, navigate]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const token = await loginUser(data.username, data.password);
      if (token) {
        login(token);
      } else {
        setError("Invalid login response.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid username or password");
    }
  };

  
  const cardBg = useColorModeValue("white", "gray.700");

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      bgGradient="linear(to-r, blue.200, purple.200)"
      px={4}
    >
 
      <Box
        w="full"
        maxW="md"
        bg={cardBg}
        p={8}
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h2" size="lg" mb={6} textAlign="center">
          Login
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          {error && (
            <Text color="red.500" mb={4} textAlign="center">
              {error}
            </Text>
          )}

          <Button
            type="submit"
            colorScheme="blue"
            w="full"
            mt={2}
            _hover={{ bg: "blue.600" }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
