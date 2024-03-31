
interface Props{
    result: string
}
export const SearchResult: React.FC<Props> = ({ result }) => {
  return (
    <div
      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};
