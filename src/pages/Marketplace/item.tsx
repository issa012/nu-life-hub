import { Link } from "react-router-dom";

const Item = ({ item }: { item: IItem }) => {
  return (
    <li className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 pb-[2px] bg-white">
      <div className="h-full rounded-lg pb-3">
        <div className="">
          <div className="relative rounded-lg overflow-hidden h-full flex justify-center before:block before:content=[''] before:pt-[100%]">
            <Link to={`${item.id}`}>
              <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center h-full w-full">
                <img
                  className="inline-block max-h-full max-w-full flex-shrink-0 h-full w-full object-contain bg-muted"
                  src={item.image_url}
                />
              </div>
            </Link>
          </div>
          <div className="my-2 mx-1 w-auto">
            <Link to={`${item.id}`} className="hover:underline">
              <h3 className="text-sm line-clamp-3">{item.name}</h3>
            </Link>
            <div>
              <div>
                <span className="font-bold text-base">{item.price} tenge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default Item;

interface IItem {
  id: string;
  user: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  created_date: string;
}
