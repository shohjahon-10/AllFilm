import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../assets/img/kinoLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";

import { SearchData } from "../components/headers";

export function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkNavList = [
    { path: "/", title: "Home" },
    { path: "/popular", title: "Popular" },
    { path: "/collection", title: "Collection" },
    { path: "/top-rated", title: "Top Rated" },
  ];

  return (
    <>
      <Box bg="gray.800" p={5}>
        <Flex alignItems="center" justify="space-between">
          <Image src={Logo} alt="Logo" boxSize="50px" />

          <List display="flex" gap="20px" styleType="none">
            {linkNavList.map((item, index) => (
              <ListItem key={index}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "teal" : "white",
                    fontWeight: isActive ? "bold" : "normal",
                  })}
                >
                  {item.title}
                </NavLink>
              </ListItem>
            ))}
          </List>

          <Flex alignItems="center" gap="10px">
            <Button
              onClick={onOpen}
              bg="teal"
              color="white"
              leftIcon={<FontAwesomeIcon icon={faSearch} />}
            >
              Search
            </Button>
            <Button bg="teal" color="white">
              Login
            </Button>
          </Flex>
        </Flex>
      </Box>
      <SearchData isOpen={isOpen} onClose={onClose} />

      <Outlet />
    </>
  );
}
