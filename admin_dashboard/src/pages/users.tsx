

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers, searchUserById, filterUsersByGender } from "../Api/usersapi";
import { Box, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Select, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
}

const Users: React.FC = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>(undefined);
 
  const { data: users, refetch, isLoading } = useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: Infinity,  
  });

 
  const searchMutation = useMutation<User | null, Error, number>({
    mutationFn: searchUserById,
    onSuccess: (data) => {
      setFilteredUsers(data ? [data] : []);
    },
  });

 
  const filterMutation = useMutation<User[], Error, string>({
    mutationFn: filterUsersByGender,
    onSuccess: (data) => {
      setFilteredUsers(Array.isArray(data) ? [...data] : []);
    },
    onError: (error) => {
      console.error("Error filtering users:", error);
      setFilteredUsers([]);
    },
  });

 
  const handleSearch = () => {
    if (searchId) {
      searchMutation.mutate(parseInt(searchId));
      setGenderFilter("");  
    } else {
      setFilteredUsers(undefined);
      refetch();
    }
  };

 
  const handleFilter = (gender: string) => {
    setGenderFilter(gender);
    setSearchId("");  

    if (gender) {
      filterMutation.mutate(gender);
    } else {
      setFilteredUsers(users ?? []); 
    }
  };

  
  const displayedUsers = filteredUsers !== undefined ? filteredUsers : users;

  return (
    <Box p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>Users Management</Text>
      {isLoading && <Text>Loading users...</Text>}
      <Box display="flex" gap={4} mb={4}>
        <Input 
          placeholder="Search by ID" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
        />
        <Button onClick={handleSearch}>Search</Button>
        <Select 
          placeholder="Filter by Gender" 
          value={genderFilter} 
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
      </Box>
      {displayedUsers && displayedUsers.length > 0 ? (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Age</Th>
              <Th>View</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayedUsers.map((user: User) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.firstName} {user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.gender}</Td>
                <Td>{user.age}</Td>
                <Td>
                  <Link as={RouterLink} to={`/users/${user.id}`} color="blue.500">
                    View Details
                  </Link>
                </Td>
                <Td>
                  <Link as={RouterLink} to={`/editusers/${user.id}`} color="green.500">
                    Edit
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No users found.</Text>
      )}
    </Box>
  );
};

export default Users;


