import { Box, Image, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useNavigate } from "react-router-dom";

export function Collection() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const url = "https://api.themoviedb.org/3/movie/now_playing";
  const options = {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZGE0OGYyNGNlMWRjZmU3YTI2YTA1YmU3YTNhYmEzZSIsIm5iZiI6MTcwNzExMjEyNi43NzMsInN1YiI6IjY1YzA3NmJlNDM5OTliMDE4NGM5ODllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._uGk-QvvbXMxib7CyStOVycDVbZ4Zhg_74K2PkCsXMQ",
    },
  };
  const fetchData = async () => {
    const { data } = await axios.get(url, options);
    console.log(data);
    setMovie(data.results);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(movie);

  return (
    <Box userSelect={"none"} w={"full"} p={4} bg="gray.800" color="white">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {movie?.map((item) => (
          <SwiperSlide key={item?.id}>
            <VStack
              cursor="pointer"
              boxShadow="lg"
              borderRadius="20px"
              overflow="hidden"
              p={4}
              bg="rgba(4, 4, 4, 0.9)"
              onClick={() =>
                navigate(
                  `/films/${item?.title?.toLowerCase()}-${item?.id}
                  }`
                )
              }
            >
              <Text
                fontSize="20px"
                fontWeight="bold"
                color="teal.300"
                textAlign="center"
                mb={4}
              >
                {item.title}
              </Text>
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                borderRadius="10px"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              />
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
