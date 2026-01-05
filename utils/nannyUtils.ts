import type { Nanny, SortOption } from "@/types/nanny";

export function filterAndSortNannies(
  nannies: Nanny[],
  filter: SortOption
): Nanny[] {
  let list = [...nannies];

  switch (filter) {
    case "alphabet-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabet-desc":
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-less-10":
      list = list.filter((n) => n.price_per_hour <= 10);
      break;
    case "price-more-10":
      list = list.filter((n) => n.price_per_hour > 10);
      break;
    case "popular":
      list = list.filter((n) => n.rating >= 4);
      break;
    case "not-popular":
      list = list.filter((n) => n.rating < 4);
      break;
    case "all":
      break;
  }

  return list;
}
