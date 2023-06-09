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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock, FaUserNinja, FaUserSecret } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../api";
import { useState } from "react";

interface ISignUpForm {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignUpForm>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [backendErrorMessage, setBackendErrorMessage] = useState("");
  const password = watch("password");
  const data = {
    name: "name",
    email: "email",
    username: "username",
    password: "password",
  };
  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast({
        title: "Account created!",
        status: "success",
      });
      onClose();
      queryClient.refetchQueries(["me"]);
    },
    onError: (error: any) => {
      setBackendErrorMessage(
        error?.response?.data?.error ||
          toast({
            title: "Account creation failed.",
            status: "error",
          })
      );
    },
  });

  const onSubmit = (data: ISignUpForm) => {
    mutation.mutate(data);
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
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
                {...register("username", {
                  required: "Please write your username",
                })}
                variant={"filled"}
                placeholder="Username"
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
                type={"password"}
                required
                {...register("password", {
                  required: "Please write your password",
                })}
                variant={"filled"}
                placeholder="Password"
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
                type={"password"}
                required
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
                variant={"filled"}
                placeholder="Password confirm"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              ></InputLeftElement>
              <Input
                required
                {...register("name", {
                  required: "Please write your name",
                })}
                variant={"filled"}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              ></InputLeftElement>
              <Input
                required
                {...register("email", {
                  required: "Please write your Email",
                })}
                variant={"filled"}
                placeholder="Email"
              />
            </InputGroup>
          </VStack>
          {errors.password && (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              {errors.password.message}
            </Text>
          )}
          {mutation.isError ? (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              {backendErrorMessage}
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            width={"100%"}
          >
            Sign up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
