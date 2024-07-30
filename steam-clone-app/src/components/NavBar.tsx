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
            <details>
              <summary>Products</summary>
              <ul className="p-2">
                <li>
                  <a>All Products</a>
                </li>
                <li>
                  <a>Wishlist</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Button</a>
      </div>
    </div>
    
  );
}
