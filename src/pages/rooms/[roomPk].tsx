import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  VStack,
  Text,
  Avatar,
  Container,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { getRoom, getRoomReviews } from "../api";
import { IReview, IRoomDetail } from "../types";

export default function RoomDetail() {
  const params = useRouter();
  const { roomPk } = params.query;
  const { isLoading, data } = useQuery<IRoomDetail>([`room`, roomPk], getRoom);
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getRoomReviews);

  return (
    <Box mt={10} px={{ base: 10, lg: 40 }}>
      <Skeleton height={"40"} isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        rounded={"lg"}
        overflow={"hidden"}
        mt={8}
        gap={4}
        height="60vh"
        templateRows={"1fr 1fr"}
        templateColumns={"repeat(4,1fr)"}
      >
        {/*map 함수를 사용하여 배열을 반복하고, 배열의 인덱스를 key로 사용한다.
         배열의 인덱스가 0이면 colSpan과 rowSpan을 2로 설정한다.
         배열의 인덱스가 0이 아니면 colSpan과 rowSpan을 1로 설정한다.
         배열의 인덱스가 0이면 첫 번째 그리드 아이템이 두 칸을 차지하게 된다.
         배열의 인덱스가 0이 아니면 두 번째 그리드 아이템부터는 한 칸을 차지하게 된다.
  이후에 데이터에서 사진을 가져와서 이미지를 보여준다
  1번 인덱스에 사진이 없다면 스켈레톤을 보여준다..*/}

        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              {data?.photos[index]?.file && (
                <Image
                  objectFit={"cover"}
                  src={data?.photos[index].file}
                  w="100%"
                  h="100%"
                />
              )}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={"80%"} justifyContent={"space-between"} mt="10">
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <Heading size={"2xl"}>House hosted by {data?.owner?.name}</Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={"30px"}>
            <HStack mt="3" justifyContent={"flex-start"} w="100%">
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? "" : "s"}
              </Text>
              <Text>·</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar name={data?.owner.name} size={"xl"} src={data?.owner.avatar} />
      </HStack>
      <Box mt="20">
        <Heading mb={5} fontSize={"2xl"}>
          <Skeleton isLoaded={!isReviewsLoading} height={"30px"} width="20%">
            <HStack spacing={1}>
              <FaStar />
              <Text>{data?.rating}</Text>
              <Text>·</Text>
              <Text>
                {reviewsData?.length}review
                {reviewsData?.length === 1 ? "" : "s"}
              </Text>
            </HStack>
          </Skeleton>
        </Heading>
        <Container mt={15} maxWidth="container.lg" marginX="none">
          <Grid mt="10" templateColumns={"1fr 1fr"} gap={5}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  />
                  <VStack spacing={0} alignItems={"flex-start"}>
                    <Heading fontSize={"md"}>{review.user.name}</Heading>
                    <HStack spacing={1}>
                      <FaStar size="12px" />
                      <Text>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
