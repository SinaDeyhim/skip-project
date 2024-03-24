import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Chain, Validator } from "../constants";
import { Search2Icon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";

interface ValidatorTableProps {
  chain: Chain;
  validators?: Validator[];
}

function ValidatorTable({ chain, validators }: ValidatorTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredValidators, setFilteredValidators] = useState<
    Validator[] | undefined
  >(validators);

  useEffect(() => {
    setFilteredValidators(validators);
  }, [chain]);

  useEffect(() => {
    setSearchTerm("");
  }, [chain, setSearchTerm]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
      const filtered = validators?.filter((validator) =>
        validator.Name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredValidators(filtered || []);
    },
    [validators, chain]
  );

  return (
    <Flex flexDirection="column">
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
              value={searchTerm}
              onChange={handleSearch}
            />
          </InputGroup>
        </Box>
      </Flex>
      <Flex
        bg="#1C1D1E"
        p={1}
        color="grey"
        padding={4}
        borderRadius="md"
        justifyContent="space-between"
      >
        <TableContainer width="100%" minHeight={300}>
          <Table variant="unstyled" size="sm">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th minWidth={260}>Validator</Th>
                <Th>MEV Rev - Total</Th>
                <Th>MEV Rev - Kept</Th>
                <Th>Bundles</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredValidators?.length ? (
                filteredValidators.map((validator, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{validator.Name}</Td>
                    <Td>{validator.TotalMEVRevenue.toLocaleString()}</Td>
                    <Td>{validator.TotalMEVShared.toLocaleString()}</Td>
                    <Td>{validator.bundles.toLocaleString()}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={5}>
                    <Flex
                      justifyContent="center"
                      alignItems="center"
                      paddingTop={16}
                    >
                      <Text color="grey" className="font-bold" align="center">
                        No validators on {chain}
                      </Text>
                    </Flex>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}

interface ValidatorTableLoadingProps {
  hasError?: boolean;
}
export function ValidatorTableLoading({
  hasError,
}: ValidatorTableLoadingProps) {
  return (
    <Flex
      bg="#1C1D1E"
      p={1}
      color="grey"
      padding={4}
      borderRadius="md"
      justifyContent="space-between"
      minHeight={400}
    >
      <TableContainer width="100%">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th minWidth={260}>Validator</Th>
              <Th>MEV Rev - Total</Th>
              <Th>MEV Rev - Kept</Th>
              <Th>Bundles</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={5}>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  paddingTop={16}
                >
                  {hasError ? (
                    <Text color="grey" className="font-bold">
                      Validators could not be loaded. Please try another chain.
                    </Text>
                  ) : (
                    <Spinner />
                  )}
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ValidatorTable;
