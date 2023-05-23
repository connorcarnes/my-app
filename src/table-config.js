import * as React from "react";
import { Link, Input } from "@cloudscape-design/components";

export function getMatchesCountText(count) {
  return count === 1 ? `1 match` : `${count} matches`;
}

function formatDate(date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    hour12: false,
  });
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}

function createLabelFunction(columnName) {
  return ({ sorted, descending }) => {
    const sortState = sorted
      ? `sorted ${descending ? "descending" : "ascending"}`
      : "not sorted";
    return `${columnName}, ${sortState}.`;
  };
}

export const columnDefinitions = [
  {
    id: "Exercise",
    header: "Exercise",
    cell: (item) => <Link href={`#${item.Exercise}`}>{item.Exercise}</Link>,
    ariaLabel: createLabelFunction("Exercise"),
    sortingField: "Exercise",
    isRowHeader: true,
  },
  {
    id: "Weight",
    header: "Weight",
    cell: (item) => item.Weight,
    ariaLabel: createLabelFunction("Weight"),
    sortingField: "Weight",
    editConfig: {
      ariaLabel: "Weight",
      editIconAriaLabel: "editable",
      errorIconAriaLabel: "Weight Error",
      editingCell: (item, { currentValue, setValue }) => {
        return (
          <Input
            autoFocus={true}
            value={currentValue ?? item.Weight}
            onChange={(event) => setValue(event.detail.value)}
          />
        );
      },
    },
  },
  {
    id: "Reps",
    header: "Reps",
    cell: (item) => item.Reps,
    ariaLabel: createLabelFunction("Reps"),
    sortingField: "Reps",
  },
  {
    id: "RPE",
    header: "RPE",
    cell: (item) => item.RPE,
    ariaLabel: createLabelFunction("RPE"),
    sortingField: "RPE",
  },
  {
    id: "lastModified",
    header: "Last modified",
    cell: (item) => formatDate(item.lastModified),
    ariaLabel: createLabelFunction("Last modified"),
    sortingComparator: (a, b) =>
      a.lastModified.valueOf() - b.lastModified.valueOf(),
  },
];

export const paginationLabels = {
  nextPageLabel: "Next page",
  pageLabel: (pageNumber) => `Go to page ${pageNumber}`,
  previousPageLabel: "Previous page",
};

const pageSizePreference = {
  title: "Select page size",
  options: [
    { value: 10, label: "10 resources" },
    { value: 20, label: "20 resources" },
  ],
};

const visibleContentPreference = {
  title: "Select visible content",
  options: [
    {
      label: "Main properties",
      options: columnDefinitions.map(({ id, header }) => ({
        id,
        label: header,
        editable: id !== "Exercise",
      })),
    },
  ],
};
export const collectionPreferencesProps = {
  pageSizePreference,
  visibleContentPreference,
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  title: "Preferences",
};
