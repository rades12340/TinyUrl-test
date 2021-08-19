import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserInterface } from "../../App";
import "./UrlList.scss";

interface UrlListProps {
  user: UserInterface | undefined;
}

export interface URLInterface {
  _id: string;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  date: Date;
}

export interface AxiosURLInterface {
  data: URLInterface[];
  message: string;
}

const UrlList = ({ user }: UrlListProps) => {
  const [urlList, setUrlList] = useState<URLInterface[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get<AxiosURLInterface>("/url/all")
      .then((urls) => setUrlList(urls.data.data));
  }, []);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  return (
    <div className="url-list">
      {urlList.map((url) => (
        <li key={url._id}>
          <div className="long-url">{url.longUrl}</div>
          <div className="short-url">{url.shortUrl}</div>
        </li>
      ))}
    </div>
  );
};

export default UrlList;
