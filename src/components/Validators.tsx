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
import {
  SUPPORTED_CHAINS,
  Chain,
  Validator_Response,
  ValidatorStats,
} from "../constants";
import { Suspense, useCallback, useEffect, useState } from "react";

import useFetchSuspense from "../hooks/useSuspenseFetch";
import { getValidatorStats, getValidatorurl } from "../utils/utils";
import ValidatorStat from "./ValidatorStat";

function Validators() {
  const [chain, setChain] = useState(SUPPORTED_CHAINS[0]);

  const [validatorStats, setValidatorStats] = useState<
    ValidatorStats | undefined
  >();

  const validatorsRes = useFetchSuspense(
    getValidatorurl(chain.toLowerCase())
  ) as Validator_Response;

  useEffect(() => {
    if (validatorsRes?.validator_infos) {
      setValidatorStats(getValidatorStats(validatorsRes?.validator_infos));
    }
  }, [validatorsRes]);

  const handleSetValidator = useCallback(
    (chain: Chain) => () => {
      setChain(chain);
    },
    []
  );

  return (
    <Flex
      bg="#151616"
      width="100%"
      className="flex-grow w-full"
      p={1}
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
              onClick={handleSetValidator(chain)}
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
            Top MEV Validators on {chain}
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
          <ValidatorStat chain={chain} validatorStats={validatorStats} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Validators;
