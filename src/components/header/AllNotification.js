import React, { useRef, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Card } from 'primereact/card';


function AllNotification() {
  const observer = useRef();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(true);

  const fetchFakeData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}`
      );
      const responseData = response.data;
  
      setData((prevData) => {
        if (page === 1) {
          return responseData; 
        } else {
          return [...prevData, ...responseData];
        }
      });
  
      setMore(responseData.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      console.log("current page",page)
    }
  }, [page]);

  const lastElementRef = useCallback(
    (element) => {
      if (observer.current) observer.current.disconnect();
      if (!more || loading) return;
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && more) setPage((prev) => prev + 1);
      });
      if (element) observer.current.observe(element);
    },
    [more, loading]
  );

  useEffect(() => {
    fetchFakeData();
  }, [fetchFakeData]);

  return (
    <>
      <div className="p-3">
        <ul>
          {data.map((notification, index) => (
            <li
              key={index}
              ref={index === data.length - 1 ? lastElementRef : undefined}
            >
              <div className="card mb-2">
                <Card className="grid">
                  <div className="col-2">
                    <p className="m-0">{notification.id}</p>
                  </div>
                  <div className="col-2">
                    <p className="m-0" style={{ fontWeight: "bold" }}>
                      {notification.title}
                    </p>
                  </div>
                  <div className="col-8">
                    <p className="m-0">{notification.body}</p>
                  </div>
                </Card>
              </div>
            </li>
          ))}
        </ul>
        <div className="text-center p-2 mb-2">
        {loading && <p>Show More...</p>}
        </div>
        
      </div>
    </>
  );
}

export default AllNotification;






