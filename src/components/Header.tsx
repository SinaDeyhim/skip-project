import { TriangleDownIcon } from "@chakra-ui/icons";
import { Flex, Button, ButtonGroup } from "@chakra-ui/react";

function Header() {
  return (
    <Flex
      as="header"
      justify="space-between"
      bg="#121214"
      className="px-16 py-4"
    >
      <Flex as="span" grow={2} color="white">
        Skip/Select
      </Flex>
      <Flex as="span" grow={1}>
        <Flex as="span" grow={1} justifyContent="space-between">
          <ButtonGroup gap="1">
            <Button colorScheme="whiteAlpha" variant="ghost" size="sm">
              Home
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost" size="sm">
              Github
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost" size="sm">
              Careers
            </Button>
            <Button colorScheme="whiteAlpha" variant="ghost" size="sm">
              Contact
            </Button>
          </ButtonGroup>
          <ButtonGroup gap="1">
            <Button
              colorScheme="gray"
              size="sm"
              variant="solid"
              rightIcon={<TriangleDownIcon boxSize={2} />}
            >
              Sign Up
            </Button>
            <Button
              colorScheme="blackAlpha.600"
              size="sm"
              variant="solid"
              rightIcon={<TriangleDownIcon boxSize={2} />}
            >
              Connect Wallet
            </Button>
          </ButtonGroup>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;
