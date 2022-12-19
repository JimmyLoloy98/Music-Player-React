import { Box, Button, Card, CardBody, CardHeader, ChakraProvider, Heading, Img, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import useSound from "use-sound";
import lluvia from "./assets/lluvia.wav";
import './App.css'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { pause, duration, sound }] = useSound(lluvia);
  const [seconds, setSeconds] = useState();
  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
    } else {
      play();
      setIsPlaying(true);
    }
  };

  return (
    <ChakraProvider>
      <Card px={6}>
        <CardBody pt={0}>
          <CardHeader>
            <Heading size="md">Playing Now</Heading>
          </CardHeader>

          <Img borderRadius={10} src="https://picsum.photos/200/200"></Img>

          <Box my={4}>
            <Heading size="sm">Rubaiyyan</Heading>
            <Text>Qala</Text>
          </Box>

          <Box mb={3}>
            <Stack direction="row" justify="space-between">
              <Text fontSize="xs" color="gray">
                {currTime.min}:{currTime.sec}
              </Text>
              <Text fontSize="xs" color="gray">
                {time.min}:{time.sec}
              </Text>
            </Stack>

            <Slider
              defaultValue={0}
              min={0}
              max={duration / 1000}
              value={seconds}
              onChange={(e) => {
                sound.seek([e.target.value]);
              }}
            >
              <SliderTrack bg="teal.100">
                <SliderFilledTrack bg="teal" />
              </SliderTrack>
              <SliderThumb boxSize={4}></SliderThumb>
            </Slider>
          </Box>

          <Stack direction="row" spacing="2" justify="center" align="center">
            <Button
              colorScheme="teal"
              borderRadius="full"
              variant="ghost"
              className="playButton"
            >
              <ArrowLeftIcon />
            </Button>
            {!isPlaying ? (
              <Button
                borderRadius="full"
                colorScheme="teal"
                variant="solid"
                className="playButton"
                onClick={playingButton}
              >
                <CheckIcon />
              </Button>
            ) : (
              <Button
                borderRadius="full"
                colorScheme="teal"
                variant="solid"
                className="playButton"
                onClick={playingButton}
              >
                <CloseIcon />
              </Button>
            )}
            <Button
              colorScheme="teal"
              borderRadius="full"
              variant="ghost"
              className="playButton"
            >
              <ArrowRightIcon />
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </ChakraProvider>
  );
}

export default App
