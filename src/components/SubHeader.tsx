import {
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { MdKeyboardCommandKey } from "react-icons/md";
import { TbLetterK } from "react-icons/tb";

function SubHeader() {
  return (
    <Flex justify="space-between" bg="#141415" p={4}>
      <Flex as="span" grow={10} color="white">
        <Link href="/" paddingEnd={8} color="GrayText">
          Overview
        </Link>
        <Link href="/">Validators</Link>
      </Flex>
      <Flex as="span" grow={1} justifyContent="end" alignItems="center">
        <InputGroup justifyContent="center" alignItems="center">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray" />
          </InputLeftElement>
          <Input
            colorScheme="grey"
            placeholder="Search..."
            htmlSize={8}
            focusBorderColor="grey"
            borderColor="whiteAlpha.100"
          />
          <InputRightElement
            pointerEvents="none"
            color="grey"
            boxSize={8}
            paddingEnd={4}
            paddingTop={2}
          >
            <Icon as={MdKeyboardCommandKey} />
            <Icon as={TbLetterK} />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}

export default SubHeader;
