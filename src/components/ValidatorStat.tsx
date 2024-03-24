import { Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Chain, ValidatorStats } from "../constants";
import { HiOutlineCash } from "react-icons/hi";
import { formatStats } from "../utils/utils";
import { useMemo } from "react";

interface ValidityStatProps {
  chain: Chain;
  validatorStats?: ValidatorStats;
}

function ValidatorStat({ chain, validatorStats }: ValidityStatProps) {
  return (
    <Box
      justifyContent="space-between"
      p={8}
      border="1px"
      borderColor="whiteAlpha.100"
      borderRadius="md"
      width="100%"
      className="px-16 py-4"
    >
      <Text fontSize="l" color="white" className="font-bold">
        {chain} Validator Stats
      </Text>
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">Number of Bundles</Text>
        <Text color="white">{formatStats(validatorStats?.bundles)}</Text>
      </Stack>
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">MEV captured for delegates</Text>
        <Text color="white">
          ${formatStats(validatorStats?.TotalMEVRevenue)}
        </Text>
      </Stack>
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">Total MEV captured</Text>
        <Text color="white">
          ${formatStats(validatorStats?.TotalMEVShared)}
        </Text>
      </Stack>
    </Box>
  );
}

export default ValidatorStat;

interface ValidatorStatLoadingProps {
  hasError?: boolean;
}

export function ValidatorStatLoading({ hasError }: ValidatorStatLoadingProps) {
  const loadingState = useMemo(() => {
    {
      return hasError ? <Text color="grey">N/A</Text> : <Spinner />;
    }
  }, [hasError]);

  return (
    <Box
      alignItems="center"
      p={8}
      marginEnd={4}
      border="1px"
      borderColor="whiteAlpha.100"
      borderRadius="md"
      width="100%"
    >
      {hasError ? (
        <Text color="white">Validator not available</Text>
      ) : (
        loadingState
      )}
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">Number of Bundles</Text>
        {loadingState}
      </Stack>
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">MEV captured for delegates</Text>
        {loadingState}
      </Stack>
      <Stack paddingTop={8}>
        <Icon color="grey" as={HiOutlineCash} />
        <Text color="grey">Total MEV captured</Text>
        {loadingState}
      </Stack>
    </Box>
  );
}
