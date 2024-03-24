import { Box, ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Validators from "./components/Validators";
import ValidatorErrorState from "./components/ValidatorErrorState";
import ErrorBoundary from "./components/ErrorBoundary";
import ValidatorsContentLoading from "./components/ValidatorsContentLoading";
import { Suspense } from "react";

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
