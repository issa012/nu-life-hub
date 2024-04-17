import banner from "@/assets/banner.png";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-7">
      <div className="h-full overflow-hidden">
        {events.map((event) => (
          <Link to="#">
            <Card className="hover:bg-muted mt-5">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  <span>{event.date.toDateString()}</span>
                  <span>{event.clubName}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>{event.desc}</CardContent>
              <CardFooter></CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      <div className="">
        <Calendar />
      </div>
    </div>
  );
};
export default Homepage;

const events = [
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
  {
    title: "Astana BALL",
    date: new Date(),
    desc: "Come to Astana BALL everyone",
    imgUrl: "",
    clubName: "Ball club",
    clubIconUrl: "",
  },
];
