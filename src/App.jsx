import { useState, useEffect } from "react";
import { HiCalendar } from "react-icons/hi";
import {
  Image,
  Heading,
  Box,
  Flex,
  Text,
  Spacer,
  Tag,
  Icon,
  Button,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import * as API from "./services/launches";
import logo from "./assets/logo-spacex.png";

const App = () => {
  const [launches, setLaunches] = useState([]);

  useEffect(() => {
    API.getAllLaunches().then(setLaunches);
  }, []);

  return (
    <>
      <Image m={4} src={logo} width={300} alt="SpaceX Logo" />
      <Heading m={4} as="h1" size="xl">
        SpaceX Launches
      </Heading>
      <ul>
        {launches.map((launch) => (
          <Box
            key={launch.flight_number}
            bg="gray.100"
            p={4}
            m={4}
            borderRadius="lg"
          >
            <Flex>
              <Text fontSize="lg">
                Mission <strong>{launch.mission_name}</strong> (
                {launch.launch_year})
              </Text>
              <Spacer />
              <Tag p={2} colorScheme={launch.launch_success ? "green" : "red"}>
                {launch.launch_success ? "Success" : "Failure"}
              </Tag>
            </Flex>

            <Flex align="center">
              <Icon as={HiCalendar} color="gray.500" />
              <Text fontSize="sm" ml={1} color="gray.500">
                {dayjs(launch.launch_date_local)
                  .locale("es")
                  .format("D MMMM, YYYY")}
              </Text>
            </Flex>

            <Button mt={2} colorScheme="blue">
              More details
            </Button>
          </Box>
        ))}
      </ul>
    </>
  );
};

export default App;
