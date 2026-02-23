export default function Spinner({ small }: { small?: boolean }) {
  const cls = small ? "w-3.5 h-3.5 border" : "w-5 h-5 border-2";
  return <div className={`${cls} border-white/40 border-t-white rounded-full animate-spin`} />;
}