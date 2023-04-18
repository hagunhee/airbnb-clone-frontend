import { Text, Heading, VStack, Spinner, useToast } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { githubLogIn, kakaoLogIn } from "../api";

export default function KakaoConfirm() {
  //장고에서 유저네임이나 네임 둘 중 하나만 써야함.
  //유즈이펙트를 이용하여 이 화면이 처음 나탔을때 백엔드에 깃헙 포스트 요청을 보내고싶다. 깃헙로그인을 위해서
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const code = router.query.code;
  const confirmLogin = async () => {
    if (code) {
      const status = await kakaoLogIn(code);
      if (status === 200) {
        toast({
          title: "Welcome!",
          description: "Welcome to AirBnB",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        queryClient.refetchQueries(["me"]);
        router.push("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, [router.query.code]);

  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}
