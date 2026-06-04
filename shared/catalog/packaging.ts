export type PackagingFamily = {
  id: string;
  name: string;
  description: string;
};

export type PackagingVariant = {
  id: string;
  familyId: PackagingFamily["id"];
  patternId: PackagingDecorationPattern["id"];
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  image: string;
  price: number;
};

export type Packaging = PackagingVariant & {
  family: PackagingFamily;
  pattern: PackagingDecorationPattern;
};

export type PackagingDecorationPattern = {
  id: string;
  name: string;
  description: string;
  fileName: string;
};

const packagingPrice = 120000;

export const packagingFamilies: PackagingFamily[] = [
  {
    id: "hexagon",
    name: "Hexagon package",
    description: "Hexagonal presentation box for premium bird nest gifting.",
  },
  {
    id: "suitcase",
    name: "Suitcase package",
    description: "Structured suitcase-style gift box for formal presentation.",
  },
  {
    id: "cylinder",
    name: "Cylinder package",
    description: "Round multi-drawer package for premium display and storage.",
  },
];

export const packagingDecorationPatterns: PackagingDecorationPattern[] = [
  {
    id: "lotus",
    name: "Hoa sen",
    description: "Lotus decoration pattern for elegant gifting.",
    fileName: "lotus.webp",
  },
  {
    id: "swiftlet",
    name: "Chim yến",
    description: "Swiftlet decoration pattern inspired by bird nest heritage.",
    fileName: "swiftlet.webp",
  },
  {
    id: "apricot-blossom",
    name: "Hoa mai",
    description: "Apricot blossom decoration pattern for festive gifting.",
    fileName: "apricot_blossom.webp",
  },
];

const packagingColors = ["Blue", "Green", "Red", "Yellow"] as const;

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export const packagingVariants: PackagingVariant[] = packagingFamilies.flatMap((family) =>
  packagingColors.flatMap((color) =>
    packagingDecorationPatterns.map((pattern) => ({
      id: `${family.id}-${toSlug(color)}-${pattern.id}`,
      familyId: family.id,
      patternId: pattern.id,
      name: `${family.name.replace(" package", "")} ${color} ${pattern.name}`,
      description: `${family.name.replace(" package", "")} ${color} gift packaging with ${pattern.name} decoration.`,
      primaryColor: color,
      accentColor: color,
      image: `/images/packaging-new/${family.id}/${toSlug(color)}/${pattern.fileName}`,
      price: packagingPrice,
    })),
  ),
);

export const packagingOptions: Packaging[] = packagingVariants.map((variant) => ({
  ...variant,
  family: packagingFamilies.find((family) => family.id === variant.familyId)!,
  pattern: packagingDecorationPatterns.find((pattern) => pattern.id === variant.patternId)!,
}));

export const packagingFamiliesWithVariants = packagingFamilies.map((family) => ({
  ...family,
  variants: packagingOptions.filter((variant) => variant.familyId === family.id),
}));
