import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { SUPPORTED_CHAINS, Chain } from "../constants";

import { ValidatorStatLoading } from "./ValidatorStat";
import { noop } from "../utils/utils";

function ValidatorErrorState() {
  return (
    <Flex
      bg="#151616"
      className="flex-grow w-full"
      p={1}
      flexDirection="column"
    >
      <Flex color="white" justifyContent="flex-start">
        <ButtonGroup>
          {SUPPORTED_CHAINS.map((chain) => (
            <Button
              colorScheme="whiteAlpha"
              variant="ghost"
              size="sm"
              onClick={noop}
            >
              {chain}
            </Button>
          ))}
        </ButtonGroup>
      </Flex>
      <Flex justifyContent="space-between">
        <Flex
          paddingTop={12}
          paddingStart={3}
          flexGrow={3}
          justifyContent="flex-start"
        >
          <Text fontSize="l" color="white" className="font-bold" width={300}>
            There was a problem loading validators
          </Text>
          <Box color="grey" justifySelf="center">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Search2Icon color="gray" />
              </InputLeftElement>
              <Input
                colorScheme="grey"
                placeholder="Filter"
                htmlSize={20}
                focusBorderColor="grey"
                borderColor="whiteAlpha.100"
              />
            </InputGroup>
          </Box>
        </Flex>
        <Flex flexGrow={1}>
          <ValidatorStatLoading hasError />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ValidatorErrorState;
