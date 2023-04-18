import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useRouter } from "next/router";
import { FaComment, FaGithub } from "react-icons/fa";

/**
 *OAuth의 기본적인 흐름.

장고가 사용자를 github로 보내면 github는 사용자에게 질문을 함.
질문: "이 웹 사이트하고 정보를 공유하고 싶어?"
그러면 사용자는 "네 하고 싶어요"라고 대답함.
그럼 github는 사용자에게 token을 전달함.
다시 웹 사이트로 돌아온 사용자는 이 토큰을 장고에게 전달을 함.
정확히는 브라우저? 서버?가 미리 보내달라고 요청한 url로 github가 사용자를 보내줌. 
(github.com/settings/applications/new를 하면 이게 뭔지 알게됨. Authorization callback URL임.)
그러면 장고는 github API와 통신을 하고 사용자 정보를 얻을 수 있음.
 
 */

export default function SocialLogin() {
  const kakaoParams = {
    client_id: "917d70ceb814aef01d619274b37904b8",
    redirect_uri: "http://127.0.0.1:3000/social/kakao",
    response_type: "code",
  };
  const params = new URLSearchParams(kakaoParams).toString();

  return (
    <Box mb={4}>
      <HStack my={8}>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.500"}
          fontSize={"xs"}
          as={"b"}
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack>
        <Button
          as="a"
          //scope는 사용자로부터 얻고 싶은 정보 목록을 의미한다.
          href="https://github.com/login/oauth/authorize?client_id=e81f8485025e328aaeea&scope=read:user,user:email

"
          w={"100%"}
          leftIcon={<FaGithub />}
          colorScheme={"gray"}
        >
          Continue with Github{" "}
        </Button>
        <Button
          as="a"
          href={`https://kauth.kakao.com/oauth/authorize?${params}`}
          w={"100%"}
          leftIcon={<FaComment />}
          colorScheme={"yellow"}
        >
          Continue with Kakao{" "}
        </Button>
      </VStack>
    </Box>
  );
}
//               </Button>
