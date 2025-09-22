export default function ProductRow({ name, price }) {
  return (
    <li className="flex items-center justify-between px-3 py-3.5 border-b last:border-b-0 border-black/5 dark:border-white/5">
      <span className="font-semibold truncate">{name}</span>
      <span className="font-extrabold tabular">{price}</span>
    </li>
  );
}
