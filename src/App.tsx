import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Validators from "./components/Validators";

function App() {
  return (
    <ChakraProvider>
      <Box className="flex min-h-screen w-full flex-col">
        <Header />
        <SubHeader />

        <Validators />
      </Box>
    </ChakraProvider>
  );
}

export default App;
