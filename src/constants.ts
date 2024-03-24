export type Validator = ValidatorStats & { Name: string };

export type ValidatorStats = {
  TotalMEVRevenue: number;
  TotalMEVShared: number;
  bundles: number;
};

export type Validator_Response = {
  validator_infos: Validator[];
};
export type Chain = "Osmosis" | "Juno" | "Cosmos" | "Hub";
export const SUPPORTED_CHAINS: Chain[] = ["Osmosis", "Juno", "Cosmos", "Hub"];
