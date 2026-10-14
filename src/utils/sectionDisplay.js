/**
 * Formats regular year-level sections for display.
 *
 * Only years 1-5 receive the year prefix. Existing prefixes are preserved,
 * including values such as 3-3-1A. Special levels are left unchanged.
 */
export const formatYearSection = (yearLevel, sectionDescription) => {
  const year = String(yearLevel ?? "").trim();
  const section = String(sectionDescription ?? "").trim();

  if (!section) return "";
  if (/^TBA$/i.test(section)) return section;
  if (!/^[1-5]$/.test(year)) return section;

  const yearPrefix = new RegExp(`^${year}\\s*[-\\u2013]\\s*`, "i");
  return yearPrefix.test(section)
    ? section.replace(yearPrefix, `${year}-`)
    : `${year}-${section}`;
};

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Formats section names for COR output.
 * Complete/custom labels are preserved; simple labels receive the program
 * and year-level context required by the COR format.
 */
export const formatCorSection = (programCode, yearLevel, sectionDescription) => {
  const program = String(programCode ?? "").trim().replace(/^TBA$/i, "");
  const section = String(sectionDescription ?? "").trim().replace(/^TBA$/i, "");
  const year = String(yearLevel ?? "").trim();

  if (!section) return program || "TBA";
  if (!program) return section;

  const programPrefix = new RegExp(`^${escapeRegExp(program)}`, "i");
  const yearPrefix = new RegExp(`^${escapeRegExp(year)}\\s*[-\\u2013]`, "i");

  if (programPrefix.test(section) || /NSTP/i.test(section)) return section;
  if (yearPrefix.test(section)) return `${program} - ${section}`;
  return `${program} - ${year} - ${section}`;
};
