"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { packagingFamiliesWithVariants, type Packaging } from "@/shared/catalog/packaging";
import { formatCurrency } from "@/shared/utils/currency";

type PackagingSelectorProps = {
  selectedPackagingId: string;
  onSelect: (packagingId: string) => void;
};

export function PackagingSelector({ selectedPackagingId, onSelect }: PackagingSelectorProps) {
  const [activeFamilyId, setActiveFamilyId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeFamilyId) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveFamilyId(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [activeFamilyId]);

  const activeFamily = packagingFamiliesWithVariants.find((family) => family.id === activeFamilyId) ?? null;
  const selectedPackaging = activeFamily?.variants.find((variant) => variant.id === selectedPackagingId)
    ?? packagingFamiliesWithVariants.flatMap((family) => family.variants).find((variant) => variant.id === selectedPackagingId)
    ?? null;

  return (
    <>
      <div className="packagingFamilyGrid">
        {packagingFamiliesWithVariants.map((family) => {
          const familySelection = family.variants.find((variant) => variant.id === selectedPackagingId) ?? null;
          const previewVariant = familySelection ?? family.variants[0];

          return (
            <button
              className={`packagingFamilyCard card ${familySelection ? "selected" : ""}`}
              key={family.id}
              onClick={() => setActiveFamilyId(family.id)}
              type="button"
            >
              <div className="packagingFamilyPreview">
                <Image
                  alt={family.name}
                  className="packagingImage"
                  height={360}
                  sizes="(max-width: 700px) 100vw, (max-width: 940px) 50vw, 320px"
                  src={previewVariant.image}
                  width={360}
                />
              </div>
              <div className="packagingFamilyCardBody">
                <strong>{family.name}</strong>
                <span>{family.description}</span>
                <p className="packagingFamilyCardMeta">
                  {family.variants.length} phiên bản
                </p>
                <em>
                  {familySelection
                    ? `Đã chọn: ${familySelection.name}`
                    : "Chọn mẫu hộp"}
                </em>
              </div>
            </button>
          );
        })}
      </div>

      {selectedPackaging ? (
        <div className="selectedPackagingNote card">
          <strong>Mẫu hộp quà đã chọn</strong>
          <span>{selectedPackaging.family.name} - {selectedPackaging.name}</span>
          <p className="packagingColors">{selectedPackaging.primaryColor} phối {selectedPackaging.accentColor}</p>
        </div>
      ) : null}

      {activeFamily ? (
        <div className="packagingModalBackdrop" onClick={() => setActiveFamilyId(null)} role="presentation">
          <div
            aria-label={`${activeFamily.name} variants`}
            aria-modal="true"
            className="packagingModal card"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="packagingModalHeader">
              <div>
                <h3>{activeFamily.name}</h3>
                <p>{activeFamily.description}</p>
              </div>
              <button className="packagingModalClose" onClick={() => setActiveFamilyId(null)} type="button">
                Đóng
              </button>
            </div>
            <div className="packagingGrid">
              {activeFamily.variants.map((variant) => (
                <PackagingVariantCard
                  key={variant.id}
                  isSelected={selectedPackagingId === variant.id}
                  onSelect={(packagingId) => {
                    onSelect(packagingId);
                    setActiveFamilyId(null);
                  }}
                  variant={variant}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type PackagingVariantCardProps = {
  variant: Packaging;
  isSelected: boolean;
  onSelect: (packagingId: string) => void;
};

function PackagingVariantCard({ variant, isSelected, onSelect }: PackagingVariantCardProps) {
  return (
    <button
      className={`packagingOption ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(variant.id)}
      type="button"
    >
      <div className="packagingImageFrame">
        <Image
          alt={`${variant.family.name} ${variant.name}`}
          className="packagingImage"
          height={360}
          sizes="(max-width: 700px) 100vw, (max-width: 940px) 50vw, 280px"
          src={variant.image}
          width={360}
        />
      </div>
      <div className="packagingMeta">
        <strong>{variant.name}</strong>
        <span>{variant.description}</span>
        <p className="packagingColors">{variant.primaryColor} phối {variant.accentColor}</p>
        <em>{formatCurrency(variant.price)}</em>
      </div>
    </button>
  );
}
