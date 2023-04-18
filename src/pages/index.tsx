import { Grid } from "@chakra-ui/react";
import Room from "./component/Room";
import RoomSkeleton from "./component/RoomSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getRooms } from "./api";
import { IRoomList } from "./types";
export default function Home() {
  // rooms라는 키 아래로 캐시된 데이터를 가져온다.
  // 만약 캐시된 데이터가 없다면 getRooms 함수를 실행하여 데이터를 가져온다.
  // getRooms 함수는 비동기 함수이므로 useQuery는 비동기 함수의 결과를 기다려준다.
  // 비동기 함수의 결과는 data에 담겨서 반환된다.
  // isLoading은 비동기 함수가 실행되는 동안 true가 되고, 비동기 함수가 끝나면 false가 된다.
  // 즉, isLoading이 true이면 데이터를 가져오는 중이라는 의미이다.

  const { isLoading, data } = useQuery<IRoomList[]>(["rooms"], getRooms);

  return (
    <Grid
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        sm: "1fr",
        md: "1fr 1fr",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      {isLoading ? (
        <>
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
          <RoomSkeleton />
        </>
      ) : null}
      {data?.map((room: any) => (
        <Room
          key={room.pk}
          pk={room.pk}
          imageUrl={room.photos[0].file}
          name={room.name}
          rating={room.rating}
          city={room.city}
          country={room.country}
          price={room.price}
        />
      ))}
    </Grid>
  );
}
