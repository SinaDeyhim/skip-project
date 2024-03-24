import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Validator } from "../constants";

interface ValidatorTableProps {
  validators?: Validator[];
}

function ValidatorTable({ validators }: ValidatorTableProps) {
  return (
    <Flex
      bg="#1C1D1E"
      p={1}
      color="grey"
      padding={4}
      borderRadius="md"
      justifyContent="space-between"
    >
      <TableContainer width="100%">
        <Table variant="unstyled" size="sm">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Validator</Th>
              <Th>MEV Rev - Total</Th>
              <Th>MEV Rev - Kept</Th>
              <Th>Bundles</Th>
            </Tr>
          </Thead>
          <Tbody>
            {validators?.length
              ? validators.map((validator, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{validator.Name}</Td>
                    <Td>{validator.TotalMEVRevenue.toLocaleString()}</Td>
                    <Td>{validator.TotalMEVShared.toLocaleString()}</Td>
                    <Td>{validator.bundles.toLocaleString()}</Td>
                  </Tr>
                ))
              : "No Validators found"}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ValidatorTable;
