import Link from "next/link";

const PLATFORM_CONFIG = {
  github: {
    variant: "bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700",
    icon: "bx bxl-github",
    label: "GitHub",
  },
  instagram: {
    variant: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90",
    icon: "bx bxl-instagram",
    label: "Instagram",
  },
  linkedin: {
    variant: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600",
    icon: "bx bxl-linkedin",
    label: "LinkedIn",
  },
  twitter: {
    variant: "bg-sky-500 text-white hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500",
    icon: "bx bxl-twitter",
    label: "Twitter",
  },
  youtube: {
    variant: "bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600",
    icon: "bx bxl-youtube",
    label: "YouTube",
  },
};

const COLOR_VARIANTS = {
  indigo:  "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-900/50",
  green:   "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/40 dark:text-green-400 dark:hover:bg-green-900/50",
  red:     "bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-900/50",
  yellow:  "bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-950/40 dark:text-yellow-400 dark:hover:bg-yellow-900/50",
  gray:    "bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
  default: "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-800",
};

/**
 * PillLink — clickable badge/chip navigasi ke href
 *
 * Props:
 * - href       : string  — URL tujuan
 * - platform   : "github" | "instagram" | "linkedin" | "twitter" | "youtube"
 *                jika diisi, override variant & icon otomatis
 * - icon       : string  — class boxicon manual (diabaikan jika platform diisi)
 * - children   : string  — label teks (diabaikan jika platform diisi)
 * - variant    : "default" | "indigo" | "green" | "red" | "yellow" | "gray"
 * - external   : boolean — buka di tab baru (otomatis true jika platform diisi)
 */
export default function PillLink({
  href = "#",
  platform,
  icon,
  children,
  variant = "indigo",
  external = false,
}) {
  const isPlatform = platform && PLATFORM_CONFIG[platform];
  const config = isPlatform ? PLATFORM_CONFIG[platform] : null;

  const variantClass = isPlatform
    ? config.variant
    : (COLOR_VARIANTS[variant] ?? COLOR_VARIANTS.default);

  const resolvedIcon = isPlatform ? config.icon : icon;
  const resolvedLabel = isPlatform ? config.label : children;
  const isExternal = isPlatform ? true : external;

  const cls = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none ${variantClass}`;

  const content = (
    <>
      {resolvedIcon && <i className={`${resolvedIcon} text-sm leading-none`} />}
      {resolvedLabel}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}