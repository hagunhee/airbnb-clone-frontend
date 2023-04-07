import { Text, Button, Heading, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    // min H 유저의 스크린 크기만큼 화면 높이를 키우겠다
    <VStack bg="gray.100" justifyContent={"center"} minH={"100vh"}>
      <Heading>Page not found.</Heading>
      <Text>It seems that you're lost</Text>
      <Link href={"/"}>
        <Button colorScheme={""} variant={"solid"}>
          Go home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
