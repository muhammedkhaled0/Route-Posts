export default function UserImage({ src, size = "md" }: { src?: string; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  return (
    <img
      src={src || "/person.jpg"}
      onError={(e) => { (e.target as HTMLImageElement).src = "/person.jpg"; }}
      className={`${cls} rounded-full object-cover shrink-0 ring-2 ring-white shadow-sm`}
    />
  );
}