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
import { NavLink, Route, Routes } from "react-router-dom";
import { Collection, Home, Popular, TopRated } from "../pages";
import { UniqInfo } from "../pages";
import { SearchData } from "../components/headers";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkNavList = [
    { path: "/", title: "Home" },
    { path: "/popular", title: "Popular" },
    { path: "/collection", title: "Collection" },
    { path: "/topRated", title: "Top Rated" },
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/films/:filmID" element={<UniqInfo />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/topRated" element={<TopRated />} />
      </Routes>
    </>
  );
}

export default App;
