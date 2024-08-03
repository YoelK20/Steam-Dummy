import { cookies } from "next/headers";
import Link from "next/link";
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
            <Link href={"/"}>
            <button>Store</button>
            </Link>
          </li>
          <li>
          <Link href={"/products"}>
          <button>Products</button>
            </Link>
          </li>
          <li>
          <Link href={"/wishlist"}>
            <button>Wishlist</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
      <form
        className="text-center"
        action={async () => {
          "use server";
          cookies().get("token") && cookies().delete("token");
          redirect("/login");
        }}
      >
        <button
          type="submit"
          className="rounded px-4 py-2 transition-colors duration-300btn btn-ghost"
        >
          Logout
        </button>
        </form>
      </div>
    </div>
    
  );
}
