import { ColumnSortState, SortDirection } from "../components/ValidatorTable";
import { Validator, ValidatorStats } from "../constants";

export function getValidatorurl(chain: string): string {
  return `https://skip-select.s3.amazonaws.com/${chain}/validators.json`;
}

export function getValidatorStats(validatorInfo: Validator[]): ValidatorStats {
  let [TotalMEVRevenue, totalMEVShared, bundles] = [0, 0, 0];

  validatorInfo.forEach((validator) => {
    bundles += validator.bundles;
    totalMEVShared += validator.TotalMEVShared;
    TotalMEVRevenue += validator.TotalMEVRevenue;
  });

  return {
    TotalMEVRevenue: TotalMEVRevenue,
    TotalMEVShared: totalMEVShared,
    bundles,
  };
}

export function formatStats(amount?: number) {
  const units = ["", "K", "M", "B", "T"];

  // Check if the number is valid
  if (!amount || isNaN(amount) || !isFinite(amount)) {
    return "N/A";
  }

  // Determine the unit to use
  const unitIndex = Math.floor(Math.log10(amount) / 3);
  const unit = units[unitIndex];

  // Calculate the value with the appropriate unit
  const value = amount / Math.pow(10, unitIndex * 3);

  // Format the value with up to 2 decimal places
  const formattedValue = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return `${formattedValue}${unit}`;
}

export function noop() {
  return;
}

export function sortValidators(
  filteredValidators: Validator[] | undefined,
  columnSort: ColumnSortState
): Validator[] | undefined {
  if (!filteredValidators || filteredValidators.length === 0) return undefined;

  return filteredValidators.slice().sort((a, b) => {
    const key = columnSort.column;

    const valueA =
      typeof a[key] === "string" ? String(a[key]).toLowerCase() : a[key];
    const valueB =
      typeof b[key] === "string" ? String(b[key]).toLowerCase() : b[key];

    if (typeof valueA === "string" && typeof valueB === "string") {
      // Ignore emojis in comparison
      const regexEmoji = /(?:\p{Emoji}|(?<=[^\p{Z}\p{S}])\p{Emoji})+/gu;
      const sanitizedValueA = valueA.replace(regexEmoji, "");
      const sanitizedValueB = valueB.replace(regexEmoji, "");

      return columnSort.direction === SortDirection.ASC
        ? sanitizedValueA.localeCompare(sanitizedValueB)
        : sanitizedValueB.localeCompare(sanitizedValueA);
    } else {
      const numValueA = Number(valueA);
      const numValueB = Number(valueB);
      if (!isNaN(numValueA) && !isNaN(numValueB)) {
        return columnSort.direction === SortDirection.ASC
          ? numValueA - numValueB
          : numValueB - numValueA;
      } else {
        return 0;
      }
    }
  });
}
