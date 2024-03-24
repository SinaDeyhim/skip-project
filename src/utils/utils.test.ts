import { Validator } from "../constants";
import { formatStats, getValidatorStats, getValidatorurl } from "./utils";

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

  it("returns zeros for all stats if validatorInfo is empty", () => {
    const validatorInfo: Validator[] = [];
    const expectedResult = {
      TotalMEVRevenue: 0,
      TotalMEVShared: 0,
      bundles: 0,
    };
    const result = getValidatorStats(validatorInfo);
    expect(result).toEqual(expectedResult);
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
