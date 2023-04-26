import { Text, Heading, VStack, Spinner, useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { githubLogIn, kakaoLogIn } from "../api";

export default function KakaoConfirm() {
  //장고에서 유저네임이나 네임 둘 중 하나만 써야함.
  //유즈이펙트를 이용하여 이 화면이 처음 나탔을때 백엔드에 깃헙 포스트 요청을 보내고싶다. 깃헙로그인을 위해서
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(kakaoLogIn, {
    onSuccess: () => {
      toast({
        title: "Welcome!",
        description: "Welcome to AirBnB",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      queryClient.refetchQueries(["me"]);
      router.push("/");
    },
    onError: (error: { message: string }) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      router.push("/");
    },
  });

  const confirmLogin = async () => {
    const code = router.query.code;
    if (code) {
      mutation.mutate(code as string);
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
