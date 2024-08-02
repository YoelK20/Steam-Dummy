import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Steem</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Store</a>
          </li>
          <li>
            <a>Product</a>
          </li>
          <li>
            <a>Wishlist</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
      <form
        className="mt-8 text-center"
        action={async () => {
          "use server";
          cookies().get("token") && cookies().delete("token");
          redirect("/login");
        }}
      >
        <button
          type="submit"
          className="rounded bg-blue-200 px-4 py-2 transition-colors duration-300 hover:bg-blue-400 hover:text-white"
        >
          Logout
        </button>
        </form>
      </div>
    </div>
    
  );
}
