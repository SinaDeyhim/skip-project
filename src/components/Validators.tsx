import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

import {
  SUPPORTED_CHAINS,
  Chain,
  Validator_Response,
  ValidatorStats,
} from "../constants";
import { Suspense, createRef, useCallback, useEffect, useState } from "react";

import useFetchSuspense from "../hooks/useSuspenseFetch";
import { getValidatorStats, getValidatorurl } from "../utils/utils";
import ValidatorStat from "./ValidatorStat";
import ValidatorTable from "./ValidatorTable";
import ErrorBoundary from "./ErrorBoundary";
import ValidatorErrorState from "./ValidatorErrorState";
import ValidatorsContentLoading from "./ValidatorsContentLoading";
import useIsMobile from "../hooks/isMobile";

function ValidatorsContent({ chain, setChain }: ValidatorProps) {
  const isMobile = useIsMobile();

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
      {isMobile && (
        <Flex flexDirection="column">
          <ValidatorTable
            chain={chain}
            validators={validatorsRes?.validator_infos}
          />

          <ValidatorStat chain={chain} validatorStats={validatorStats} />
        </Flex>
      )}
      {!isMobile && (
        <Flex>
          <Flex className="w-2/3">
            <ValidatorTable
              chain={chain}
              validators={validatorsRes?.validator_infos}
            />
          </Flex>
          <Flex className="w-1/6"></Flex>
          <Flex className="w-2/6">
            <ValidatorStat chain={chain} validatorStats={validatorStats} />
          </Flex>
        </Flex>
      )}
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
  }, [chain, errorBoundaryRef]);
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
      <Suspense
        fallback={
          <ValidatorsContentLoading
            chain={chain}
            setChain={handleSetValidator}
          />
        }
      >
        <ValidatorsContent chain={chain} setChain={handleSetValidator} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default Validators;
