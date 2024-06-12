import { useEffect, useState } from "react";
import AUTH_SERVICE from "../../services/auth";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await AUTH_SERVICE.getUsers();
      setUsers(res?.data.slice(0, 10));
    })();
  }, []);

  return (
    <div>
      <div className="block p-5 rounded-md mt-5 mb-2 bg-primary w-[80%] m-auto flex-center gap-3 flex-col">
        <h1 className="w-1/2 pt-2 mb-5 text-3xl font-bold text-center text-white">
          Boilerplate Project React + Vite ,Tailwind + Daisy, Redux Toolkit +
          Redux Persist, Yup + React hook form
        </h1>
        <Link to="/login" className="btn btn-active btn-secondary">
          Login with Redux
        </Link>
      </div>
      <div className="z-50 toast">
        <div className="alert alert-info">
          <span>Daisy connected successfully.</span>
        </div>
      </div>
      <div className="overflow-x-auto w-[80%] m-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Article</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?.id}>
                <th>{index + 1}</th>
                <td>{user.title}</td>
                <td>{user.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
