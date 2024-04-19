import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Item = ({ item }: { item: IItem }) => {
  return (
    <div>
      <div className="grid grid-cols-[210px_1fr] rounded-sm border mt-4 p-4">
        <div className="flex justify-center">
          <img className="aspect-auto object-cover max-h-44" src={item.image_url} />
        </div>
        <div className="">
          <div className="flex justify-between">
            <span className="text-2xl font-semibold tracking-tight">{item.name}</span>
            <span className="text-2xl">{item.price} tenge</span>
          </div>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
  return (
    <Link key={item.name} to="#">
      <Card className="hover:bg-muted mt-5 max-w-80">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span className="font-normal">{item.price}</span>
            </div>
          </CardTitle>
          <CardDescription>
            <span>
              Posted: {item.created_date} by <span className="hover:text-primary">{item.user}</span>
            </span>
            <span></span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div>
              <img src={item.image_url} />
            </div>
            <div className="mt-4">{item.description}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
export default Item;

interface IItem {
  user: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image_url: string;
  created_date: string;
}
