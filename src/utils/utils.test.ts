import { SortDirection } from "../components/ValidatorTable";
import { Validator } from "../constants";
import {
  formatStats,
  getValidatorStats,
  getValidatorurl,
  sortValidators,
} from "./utils";

describe("getValidatorStats function", () => {
  it("calculates total MEV revenue, total MEV shared, and total bundles correctly", () => {
    const validatorInfo = [
      { Name: "val1", bundles: 5, TotalMEVRevenue: 100, TotalMEVShared: 80 },
      { Name: "val2", bundles: 3, TotalMEVRevenue: 50, TotalMEVShared: 40 },
      { Name: "val3", bundles: 2, TotalMEVRevenue: 75, TotalMEVShared: 60 },
    ];

    const expectedResult = {
      TotalMEVRevenue: 225,
      TotalMEVShared: 180,
      bundles: 10,
    };

    expect(getValidatorStats(validatorInfo)).toEqual(expectedResult);
  });

  it("calculates total MEV revenue and total MEV shared correctly when validatorInfo has only one entry", () => {
    const validatorInfo = [
      { Name: "val1", bundles: 10, TotalMEVRevenue: 200, TotalMEVShared: 150 },
    ];

    const expectedResult = {
      TotalMEVRevenue: 200,
      TotalMEVShared: 150,
      bundles: 10,
    };

    expect(getValidatorStats(validatorInfo)).toEqual(expectedResult);
  });
});

describe("getValidatorurl function", () => {
  it("returns the correct validator URL based on the given chain", () => {
    const chain = "testnet";
    const expectedUrl =
      "https://skip-select.s3.amazonaws.com/testnet/validators.json";

    expect(getValidatorurl(chain)).toEqual(expectedUrl);
  });
});

describe("stats formatter", () => {
  it(" formats number correctly", () => {
    expect(formatStats(1500000)).toBe("1.5M");
    expect(formatStats(100000)).toBe("100K");
    expect(formatStats(1234567890)).toBe("1.23B");
  });

  it("handles invalid input", () => {
    expect(formatStats(NaN)).toBe("N/A");
    expect(formatStats()).toBe("N/A");
  });
});

describe("sortValidators function", () => {
  const validators = [
    {
      Name: "Stakers🤐",
      TotalMEVRevenue: 100,
      TotalMEVShared: 50,
      bundles: 10,
    },
    { Name: "IcyCRO", TotalMEVRevenue: 200, TotalMEVShared: 70, bundles: 20 },
    {
      Name: "Active Nodes",
      TotalMEVRevenue: 150,
      TotalMEVShared: 60,
      bundles: 15,
    },
  ];

  const columnSortAsc = {
    column: "Name" as keyof Validator,
    direction: SortDirection.ASC,
  };
  const columnSortDesc = {
    column: "TotalMEVRevenue" as keyof Validator,
    direction: SortDirection.DESC,
  };

  it("sorts validators by name in ascending order", () => {
    const sortedValidators = sortValidators(validators, columnSortAsc);
    expect(sortedValidators).toEqual([
      {
        Name: "Active Nodes",
        TotalMEVRevenue: 150,
        TotalMEVShared: 60,
        bundles: 15,
      },
      { Name: "IcyCRO", TotalMEVRevenue: 200, TotalMEVShared: 70, bundles: 20 },
      {
        Name: "Stakers🤐",
        TotalMEVRevenue: 100,
        TotalMEVShared: 50,
        bundles: 10,
      },
    ]);
  });

  it("sorts validators by total MEV revenue in descending order", () => {
    const sortedValidators = sortValidators(validators, columnSortDesc);
    expect(sortedValidators).toEqual([
      { Name: "IcyCRO", TotalMEVRevenue: 200, TotalMEVShared: 70, bundles: 20 },
      {
        Name: "Active Nodes",
        TotalMEVRevenue: 150,
        TotalMEVShared: 60,
        bundles: 15,
      },
      {
        Name: "Stakers🤐",
        TotalMEVRevenue: 100,
        TotalMEVShared: 50,
        bundles: 10,
      },
    ]);
  });
});
