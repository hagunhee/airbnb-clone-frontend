import useUser from "@/lib/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
  ToastId,
  LightMode,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { logOut } from "../api";
import { useRef } from "react";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const logoColor = useColorModeValue("red.500", "red.200");
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onClose: onSignUpClose,
  } = useDisclosure();
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  //useRef는 state에 넎고 싶지 않은 value를 저장할 때 사용.
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out",
        description: "Sad to see you go...",
        status: "loading",
        position: "bottom",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"center"}
      spacing={{
        sm: 4,
        md: 0,
      }}
      py={"5"}
      px={"40"}
      borderBottomWidth={1}
      direction={{ sm: "column", md: "row" }}
    >
      <Box color={logoColor}>
        <Link href={"/"}>
          <FaAirbnb size={48} />
        </Link>
      </Box>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
