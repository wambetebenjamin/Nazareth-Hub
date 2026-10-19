"use client";

import { motion } from "framer-motion";

type Props = {
  subheading?: string;
  title: React.ReactNode;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  white?: boolean;
};

/** Rebuilt on the zip `.heading-section` (h2 with coloured span). */
export function SectionHeading({
  subheading,
  title,
  highlight,
  description,
  align = "center",
  white = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`heading-section ${white ? "heading-section-white" : ""} ${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      }`}
    >
      {subheading && <span className="subheading">{subheading}</span>}
      <h2 className="mb-4">
        {title} {highlight && <span>{highlight}</span>}
      </h2>
      {description && <p className="text-[15px] leading-relaxed">{description}</p>}
    </motion.div>
  );
}
