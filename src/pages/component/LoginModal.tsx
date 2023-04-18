import SocialLogin from "./SocialLogin";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaLock, FaUserNinja } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  /* register은 인풋을 정의해주는 역할을 한다. onSubmit을 통해 값을 전달할 때 사용하며
  name, onChange, onBlur, value, ref를 인자로 받는다.
  watch는 인풋의 값을 감시하는 역할을 한다.
  */

  interface IForm {
    username: string;
    password: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        {/* 인풋을 정의해주기 위해 ModalBody를 as="form"으로 감싸준다. */}
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              ></InputLeftElement>
              <Input
                required
                {...register("username", { required: "Please write username" })}
                variant={"filled"}
                placeholder="Username"
                isInvalid={Boolean(errors.username?.message)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                required
                {...register("password", { required: "Please write password" })}
                type="password"
                variant={"filled"}
                placeholder="Password"
                isInvalid={Boolean(errors.password?.message)}
              />
            </InputGroup>
          </VStack>
          <Button type="submit" mt={4} colorScheme={"red"} width={"100%"}>
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
