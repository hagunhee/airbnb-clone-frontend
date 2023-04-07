import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../api";
import { useRouter } from "next/router";
interface IRoomProps {
  pk: number;
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: IRoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");

  return (
    <Link href={`/rooms/${pk}`}>
      <VStack alignItems={"flex-start"} spacing="1">
        <Box position="relative" overflow={"hidden"} mb="2" rounded={"3xl"}>
          <Image
            //H를 제거하고 minH를 설정하여 이미지가 없을 때 높이를 지정해준다.
            minH="280"
            alt="image"
            objectFit="cover"
            src={imageUrl}
          />
          <Button
            variant={"unstyled"}
            cursor={"pointer"}
            position={"absolute"}
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size={"20"} />
          </Button>
        </Box>
        <Box>
          <Grid gap="2" templateColumns={"6fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize={"md"}>
              {name}
            </Text>
            <HStack
              _hover={{ color: "red.100" }}
              spacing={1}
              alignItems="center"
            >
              <FaStar size={15} />
              <Text fontSize={"sm"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text fontSize="sm" color={gray}>
            {city}, {country}
          </Text>
        </Box>
        <Text fontSize="sm" color={gray}>
          <Text as="b">${price}</Text> /night
        </Text>
      </VStack>
    </Link>
  );
}
