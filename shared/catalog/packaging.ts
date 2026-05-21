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
    id: "hexagon-teal-gold",
    familyId: "hexagon",
    name: "Teal and gold",
    description: "Dark teal box with metallic gold accents for a refined modern look.",
    primaryColor: "Teal",
    accentColor: "Metallic Gold",
    image: "/images/packaging/hexagon/teal-gold.png",
    price: 90000,
  },
  {
    id: "suitcase-burgundy-gold",
    familyId: "suitcase",
    name: "Burgundy and gold",
    description: "Deep burgundy box with metallic gold accents for a formal gift presentation.",
    primaryColor: "Burgundy",
    accentColor: "Metallic Gold",
    image: "/images/packaging/suitcase/burgundy-gold.png",
    price: 120000,
  },
  {
    id: "hexagon-ochre-charcoal",
    familyId: "hexagon",
    name: "Ochre and charcoal",
    description: "Warm ochre box with charcoal accents for an understated premium finish.",
    primaryColor: "Ochre",
    accentColor: "Charcoal",
    image: "/images/packaging/hexagon/ochre-charcoal.png",
    price: 105000,
  },
  {
    id: "cylinder-royal-blue-gold",
    familyId: "cylinder",
    name: "Royal blue and gold",
    description: "Deep royal blue cylindrical box with metallic gold accents and drawer storage.",
    primaryColor: "Royal Blue",
    accentColor: "Metallic Gold",
    image: "/images/packaging/cylinder/royal-blue-gold.png",
    price: 180000,
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
