import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";

import { ValidatorStatLoading } from "./ValidatorStat";
import { ValidatorTableLoading } from "./ValidatorTable";
import { ValidatorHeader, ValidatorProps } from "./Validators";

function ValidatorErrorState({ chain, setChain }: ValidatorProps) {
  return (
    <Flex
      bg="#151616"
      className="flex-grow w-full px-16 py-4"
      width="100%"
      flexDirection="column"
    >
      <ValidatorHeader chain={chain} setChain={setChain} />
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
          <ValidatorTableLoading hasError />
        </Flex>
        <Flex className="w-1/6"></Flex>
        <Flex className="w-2/6">
          <ValidatorStatLoading hasError />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ValidatorErrorState;
