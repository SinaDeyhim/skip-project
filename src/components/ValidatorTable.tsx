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
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa6";
import { sortValidators } from "../utils/utils";

interface ValidatorTableProps {
  chain: Chain;
  validators?: Validator[];
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

export interface ColumnSortState {
  column: keyof Validator;
  direction: SortDirection;
}

function ValidatorTable({ chain, validators }: ValidatorTableProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredValidators, setFilteredValidators] = useState<
    Validator[] | undefined
  >(validators);

  const [columnSort, setColumnSort] = useState<ColumnSortState>({
    column: "Name",
    direction: SortDirection.ASC,
  });

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

  const sortedValidators = sortValidators(filteredValidators, columnSort);

  const handleSort = useCallback(
    (column: keyof Validator) => () => {
      setColumnSort((prevColumnSort) => {
        if (prevColumnSort.column === column) {
          return {
            ...prevColumnSort,
            direction:
              prevColumnSort.direction === SortDirection.ASC
                ? SortDirection.DESC
                : SortDirection.ASC,
          };
        } else {
          return {
            column,
            direction: SortDirection.ASC,
          };
        }
      });
    },
    [columnSort, chain]
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
                <Th minWidth={260} onClick={handleSort("Name")}>
                  <Flex>
                    <span className="pr-1">Validator</span>
                    {columnSort.column === "Name" ? (
                      <>
                        {columnSort.direction === SortDirection.ASC ? (
                          <FaSortUp color="white" />
                        ) : (
                          <FaSortDown color="white" />
                        )}
                      </>
                    ) : (
                      <FaSort />
                    )}
                  </Flex>
                </Th>
                <Th onClick={handleSort("TotalMEVRevenue")}>
                  <Flex>
                    <span className="pr-1">MEV Rev - Total</span>
                    {columnSort.column === "TotalMEVRevenue" ? (
                      <>
                        {columnSort.direction === SortDirection.ASC ? (
                          <FaSortUp color="white" />
                        ) : (
                          <FaSortDown color="white" />
                        )}
                      </>
                    ) : (
                      <FaSort />
                    )}
                  </Flex>
                </Th>
                <Th onClick={handleSort("TotalMEVShared")}>
                  <Flex justifyContent="space-between">
                    <span className="pr-1">MEV Rev - Kept</span>
                    {columnSort.column === "TotalMEVShared" ? (
                      <>
                        {columnSort.direction === SortDirection.ASC ? (
                          <FaSortUp color="white" />
                        ) : (
                          <FaSortDown color="white" />
                        )}
                      </>
                    ) : (
                      <FaSort />
                    )}
                  </Flex>
                </Th>
                <Th onClick={handleSort("bundles")}>
                  <Flex>
                    <span className="pr-1">Bundles</span>
                    {columnSort.column === "bundles" ? (
                      <>
                        {columnSort.direction === SortDirection.ASC ? (
                          <FaSortUp color="white" />
                        ) : (
                          <FaSortDown color="white" />
                        )}
                      </>
                    ) : (
                      <FaSort />
                    )}
                  </Flex>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedValidators?.length ? (
                sortedValidators.map((validator, index) => (
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
