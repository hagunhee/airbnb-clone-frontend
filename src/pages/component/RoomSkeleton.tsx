import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function RoomSkeleton() {
  return (
    <Box>
      <Skeleton
        startColor="pink.500"
        endColor="orange.500"
        height={280}
        rounded="2xl"
        mb="6"
      />
      <SkeletonText
        startColor="pink.500"
        endColor="orange.500"
        noOfLines={2}
        mb="3"
        w="50%"
      />
      <SkeletonText
        startColor="pink.500"
        w="30%"
        endColor="orange.500"
        noOfLines={1}
      />
    </Box>
  );
}
