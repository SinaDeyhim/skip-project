import { Flex } from "@chakra-ui/react";

import { ValidatorStatLoading } from "./ValidatorStat";
import { ValidatorTableLoading } from "./ValidatorTable";
import { ValidatorHeader, ValidatorProps } from "./Validators";

function ValidatorsContentLoading({ chain, setChain }: ValidatorProps) {
  return (
    <Flex
      bg="#151616"
      className="flex-grow w-full px-16 py-4"
      width="100%"
      flexDirection="column"
    >
      <ValidatorHeader chain={chain} setChain={setChain} />
      <Flex>
        <Flex className="w-2/3">
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
