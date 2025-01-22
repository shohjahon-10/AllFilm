import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchData({ isOpen, onClose }) {
  const [searchInputValue, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetechSearchData = async () => {
    if (!searchInputValue.trim()) return;
    setIsLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchInputValue}`;
      const options = {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
        },
      };

      const { data, status } = await axios.get(url, options);
      if (status === 200 || status === 201) {
        setSearchData(data.results);
      }
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetechSearchData();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInputValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
      <ModalOverlay
        bg="blackAlpha.500"
        backdropFilter="auto"
        backdropBlur={"30px"}
      />
      <ModalContent userSelect={"none"}>
        <ModalHeader>
          <InputGroup>
            <InputLeftElement>
              <FontAwesomeIcon icon={faSearch} />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Film qidirish"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </InputGroup>
        </ModalHeader>
        <ModalBody>
          {isLoading ? (
            <Flex py={5} justify="center">
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : searchData.length > 0 ? (
            searchData.map((item) => (
              <Flex
                key={item.id}
                flexDir={"column"}
                justify={"center"}
                alignItems={"center"}
                gap={20}
                py={5}
              >
                <Flex
                  alignItems={"center"}
                  gap={8}
                  border={"1px solid rgba(0,0,0,0.2)"}
                  p={3}
                  borderRadius={"10px"}
                  boxShadow={"2xl"}
                  userSelect={"none"}
                  cursor={"pointer"}
                  _hover={{
                    bgColor: "rgba(0,0,0,0.1)",
                    transform: "translateY(-7px)",
                    transition: "0.2s",
                  }}
                  onClick={() =>
                    navigate(
                      `/films/${item?.title?.toLowerCase()}-${item?.id}
                  }`
                    )
                  }
                >
                  <Box
                    width={"150px"}
                    height={"200px"}
                    boxShadow={"2xl"}
                    borderRadius={"20px"}
                    overflow={"hidden"}
                  >
                    <Image
                      width={"100%"}
                      height={"100%"}
                      objectFit={"cover"}
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                          : "https://via.placeholder.com/150x200?text=No+Image"
                      }
                      alt={item.title}
                    />
                  </Box>
                  <Box>
                    <Text
                      fontWeight={"bold"}
                      fontSize={"2rem"}
                      textAlign={"center"}
                      as={"h1"}
                    >
                      {item.title}
                    </Text>
                    <Text width={"300px"}>
                      {item.overview || "No description available."}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            ))
          ) : (
            <Text textAlign="center" mt={5}>
              Film Topilmadi
            </Text>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
