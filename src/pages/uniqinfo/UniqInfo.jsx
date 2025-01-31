import "./uniqInfo.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { privateInstance } from "../../service/client/client";

export function UniqInfo() {
  const [getUniqInfo, setGetUniqInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [similarAllFilm, setSimilarAllFilm] = useState([]);
  const { filmID } = useParams();
  const navigate = useNavigate();

  const getUniqInfoFormApi = async () => {
    try {
      const { data } = await privateInstance.get("movie/" + filmID);
      setGetUniqInfo(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const gitSimilarVideos = async () => {
    try {
      const { data } = await privateInstance.get(`movie/${filmID}/videos`);
      setAllVideos(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getSimilar = async () => {
    try {
      const { data } = await privateInstance.get(`movie/${filmID}/similar`);
      setSimilarAllFilm(data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUniqInfoFormApi();
    gitSimilarVideos();
    getSimilar();
  }, [filmID]);

  if (loading) {
    return <div className="loading-message">Yuklanmoqda...</div>;
  }

  if (error) {
    return <div className="error-message">Xatolik yuz berdi: {error}</div>;
  }

  return (
    <>
      <div className="container">
        <h2 className="title">{getUniqInfo.original_title}</h2>
        <p className="info">
          <strong>Nomi:</strong> {getUniqInfo.title}
        </p>
        <p className="info">
          <strong>Tavsifi:</strong> {getUniqInfo.overview}
        </p>
        <p className="info">
          <strong>Chiqarilgan sana:</strong> {getUniqInfo.release_date}
        </p>
        <p className="info">
          <strong>Reyting:</strong> {getUniqInfo.vote_average}
        </p>
        <p className="info">
          <strong>Ovoz beruvchilar soni:</strong> {getUniqInfo.vote_count}
        </p>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500${getUniqInfo.poster_path}`}
          alt={getUniqInfo.title}
        />
      </div>
      <Box>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {allVideos?.map((e) => (
            <SwiperSlide key={e?.key}>
              <VStack
                className="film-card"
                spacing={4}
                p={4}
                border="1px solid"
                borderColor="gray.200"
                borderRadius="md"
                boxShadow="md"
                transition="transform 0.3s"
                _hover={{
                  transform: "scale(1.05)",
                  boxShadow: "lg",
                  cursor: "pointer",
                }}
              >
                <iframe
                  style={{ width: "100%", height: "315px" }}
                  src={`https://www.youtube.com/embed/${e?.key}`}
                  title={e?.type}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </VStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box py={20}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <Flex flexDir={"column"} gap={"20px"}>
            {similarAllFilm?.map((e) => (
              <SwiperSlide key={e.id}>
                <VStack
                  className="film-card"
                  spacing={4}
                  p={4}
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius="md"
                  boxShadow="md"
                  transition="transform 0.3s"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "lg",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/films/${e?.title?.toLowerCase()}-${e?.id}`)
                  }
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${e.poster_path}`}
                    alt={e.title}
                    borderRadius="md"
                  />
                  <Heading as="h3" size="md" textAlign="center">
                    {e.title}
                  </Heading>
                  <Text
                    noOfLines={3}
                    textAlign="center"
                    fontSize="sm"
                    color="gray.600"
                  >
                    {e.overview}
                  </Text>
                </VStack>
              </SwiperSlide>
            ))}
          </Flex>
        </Swiper>
      </Box>
    </>
  );
}
