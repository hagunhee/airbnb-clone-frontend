import useUser from "@/lib/useUser";
import {
  Box,
  Button,
  HStack,
  IconButton,
  useColorMode,
  useDisclosure,
  useColorModeValue,
  Stack,
  LightMode,
  Avatar,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

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
            <Avatar name={user?.name} src={user?.avatar} size={"md"} />
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </Stack>
  );
}
