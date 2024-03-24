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
import {
  Suspense,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import useFetchSuspense from "../hooks/useSuspenseFetch";
import { getValidatorStats, getValidatorurl } from "../utils/utils";
import ValidatorStat from "./ValidatorStat";
import ValidatorTable from "./ValidatorTable";
import ErrorBoundary from "./ErrorBoundary";
import ValidatorErrorState from "./ValidatorErrorState";
import ValidatorsContentLoading from "./ValidatorsContentLoading";

function ValidatorsContent({ chain, setChain }: ValidatorProps) {
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

  return (
    <Flex
      bg="#151616"
      width="100%"
      className="flex-grow w-full px-16 py-4"
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
          <ValidatorTable validators={validatorsRes?.validator_infos} />
        </Flex>
        <Flex className="w-1/6"></Flex>
        <Flex className="w-2/6">
          <ValidatorStat chain={chain} validatorStats={validatorStats} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export interface ValidatorProps {
  chain: Chain;
  setChain: (chain: Chain) => () => void;
}

export function ValidatorHeader({ chain, setChain }: ValidatorProps) {
  return (
    <Flex color="white" justifyContent="flex-start">
      <ButtonGroup>
        {SUPPORTED_CHAINS.map((supporedChain) => (
          <Button
            key={supporedChain}
            colorScheme="whiteAlpha"
            variant="ghost"
            size="sm"
            onClick={setChain(supporedChain)}
            color={supporedChain === chain ? "white" : "grey"}
          >
            {supporedChain}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
  );
}

function Validators() {
  const [chain, setChain] = useState(SUPPORTED_CHAINS[0]);
  const errorBoundaryRef = createRef<ErrorBoundary>();

  useEffect(() => {
    errorBoundaryRef?.current?.resetErrorState();
  }, [chain]);
  // defined like this to avoid passing arrow functions as prop
  const handleSetValidator = useCallback(
    (chain: Chain) => () => {
      setChain(chain);
    },
    []
  );
  return (
    <ErrorBoundary
      fallback={
        <ValidatorErrorState chain={chain} setChain={handleSetValidator} />
      }
      ref={errorBoundaryRef}
    >
      <Suspense fallback={<ValidatorsContentLoading />}>
        <ValidatorsContent chain={chain} setChain={handleSetValidator} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Validators;
