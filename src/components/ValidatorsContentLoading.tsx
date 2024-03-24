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
import { SUPPORTED_CHAINS } from "../constants";

import { ValidatorStatLoading } from "./ValidatorStat";
import { noop } from "../utils/utils";
import { ValidatorTableLoading } from "./ValidatorTable";

function ValidatorsContentLoading() {
  return (
    <Flex
      bg="#151616"
      className="flex-grow w-full px-16 py-4"
      width="100%"
      flexDirection="column"
    >
      <Flex color="white" justifyContent="flex-start">
        <ButtonGroup>
          {SUPPORTED_CHAINS.map((chain) => (
            <Button
              key={chain}
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
      <Flex>
        <Flex flexDirection="column" className="w-2/3">
          <Flex
            paddingTop={12}
            paddingStart={3}
            justifyContent="space-between"
            marginBottom={4}
          >
            <Text
              fontSize="l"
              color="white"
              className="font-bold"
              minWidth={300}
            >
              Top MEV Validators on ...
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
          <ValidatorTableLoading />
        </Flex>
        <Flex className="w-1/6"></Flex>
        <Flex className="w-2/6">
          <ValidatorStatLoading />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ValidatorsContentLoading;
