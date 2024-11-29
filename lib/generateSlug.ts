export default function generateSlug(title: string) {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Reemplaza caracteres especiales con guiones
    .replace(/^-+|-+$/g, ""); // Quita guiones al inicio y final
}
