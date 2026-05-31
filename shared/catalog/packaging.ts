export type PackagingFamily = {
  id: string;
  name: string;
  description: string;
};

export type PackagingVariant = {
  id: string;
  familyId: PackagingFamily["id"];
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  image: string;
  price: number;
};

export type Packaging = PackagingVariant & {
  family: PackagingFamily;
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

export const packagingVariants: PackagingVariant[] = [
  {
    id: "cylinder-blue",
    familyId: "cylinder",
    name: "Cylinder Blue",
    description: "Cylinder Blue gift packaging.",
    primaryColor: "Blue",
    accentColor: "Blue",
    image: "/images/packaging-new/cylinder/cyclinder-blue.png",
    price: packagingPrice,
  },
  {
    id: "cylinder-yellow",
    familyId: "cylinder",
    name: "Cylinder Yellow",
    description: "Cylinder Yellow gift packaging.",
    primaryColor: "Yellow",
    accentColor: "Yellow",
    image: "/images/packaging-new/cylinder/cylinder-yellow.png",
    price: packagingPrice,
  },
  {
    id: "cylinder-red",
    familyId: "cylinder",
    name: "Cylinder Red",
    description: "Cylinder Red gift packaging.",
    primaryColor: "Red",
    accentColor: "Red",
    image: "/images/packaging-new/cylinder/cylinder-red.png",
    price: packagingPrice,
  },
  {
    id: "cylinder-green",
    familyId: "cylinder",
    name: "Cylinder Green",
    description: "Cylinder Green gift packaging.",
    primaryColor: "Green",
    accentColor: "Green",
    image: "/images/packaging-new/cylinder/cylinder-green.png",
    price: packagingPrice,
  },
  {
    id: "hexagon-blue",
    familyId: "hexagon",
    name: "Hexagon Blue",
    description: "Hexagon Blue gift packaging.",
    primaryColor: "Blue",
    accentColor: "Blue",
    image: "/images/packaging-new/hexagon/hexagon-blue.png",
    price: packagingPrice,
  },
  {
    id: "hexagon-green",
    familyId: "hexagon",
    name: "Hexagon Green",
    description: "Hexagon Green gift packaging.",
    primaryColor: "Green",
    accentColor: "Green",
    image: "/images/packaging-new/hexagon/hexagon-green.png",
    price: packagingPrice,
  },
  {
    id: "hexagon-red",
    familyId: "hexagon",
    name: "Hexagon Red",
    description: "Hexagon Red gift packaging.",
    primaryColor: "Red",
    accentColor: "Red",
    image: "/images/packaging-new/hexagon/hexagon-red.png",
    price: packagingPrice,
  },
  {
    id: "hexagon-white",
    familyId: "hexagon",
    name: "Hexagon White",
    description: "Hexagon White gift packaging.",
    primaryColor: "White",
    accentColor: "White",
    image: "/images/packaging-new/hexagon/hexagon-white.png",
    price: packagingPrice,
  },
  {
    id: "suitcase-blue",
    familyId: "suitcase",
    name: "Suitcase Blue",
    description: "Suitcase Blue gift packaging.",
    primaryColor: "Blue",
    accentColor: "Blue",
    image: "/images/packaging-new/suitcase/suitcase-blue.png",
    price: packagingPrice,
  },
  {
    id: "suitcase-yellow",
    familyId: "suitcase",
    name: "Suitcase Yellow",
    description: "Suitcase Yellow gift packaging.",
    primaryColor: "Yellow",
    accentColor: "Yellow",
    image: "/images/packaging-new/suitcase/suitcase-yellow.png",
    price: packagingPrice,
  },
  {
    id: "suitcase-red",
    familyId: "suitcase",
    name: "Suitcase Red",
    description: "Suitcase Red gift packaging.",
    primaryColor: "Red",
    accentColor: "Red",
    image: "/images/packaging-new/suitcase/suitcase-red.png",
    price: packagingPrice,
  },
  {
    id: "suitcase-green",
    familyId: "suitcase",
    name: "Suitcase Green",
    description: "Suitcase Green gift packaging.",
    primaryColor: "Green",
    accentColor: "Green",
    image: "/images/packaging-new/suitcase/suitcase-green.png",
    price: packagingPrice,
  },
];

export const packagingOptions: Packaging[] = packagingVariants.map((variant) => ({
  ...variant,
  family: packagingFamilies.find((family) => family.id === variant.familyId)!,
}));

export const packagingFamiliesWithVariants = packagingFamilies.map((family) => ({
  ...family,
  variants: packagingOptions.filter((variant) => variant.familyId === family.id),
}));
