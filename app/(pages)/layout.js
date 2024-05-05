import LocalMenus from "../components/LocalMenus";

export default function LocalLayout({ children }) {
  return (
    <div className="flex flex-col">
      <LocalMenus />

      {children}
    </div>
  );
}
