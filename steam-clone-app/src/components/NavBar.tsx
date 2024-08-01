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
        <a className="btn">Logout</a>
      </div>
    </div>
    
  );
}
